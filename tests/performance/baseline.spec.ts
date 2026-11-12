import { expect, test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

type ScenarioName = 'small' | 'medium' | 'peak'

interface ScenarioConfig {
  name: ScenarioName
  assignedTasks: number
  unassignedTasks: number
  resources: number
}

interface MetricSummary {
  avg: number
  p50: number
  p95: number
  max: number
}

interface ScenarioResult {
  scenario: ScenarioName
  fixture: {
    requestedAssignedTasks: number
    appliedAssignedTasks: number
    requestedUnassignedTasks: number
    resources: number
    maxLaneCount: number
    laneConflicts: number
  }
  timings: {
    applyFixtureMs: number
    idlePaintsPerSecond: number
    scrollDispatch: MetricSummary
    scrollFrameGap: MetricSummary
    singleTaskUpdate: MetricSummary
  }
  rendering: {
    displayObjects: number
    displayObjectsAfterInteractions: number
    activeAnimatorsAtIdle: number
    canvases: number
  }
  interactions: {
    wheel: {
      inputEvents: number
      batches: number
      scrollMoveEvents: number
      dataZoomDispatches: number
      maxDispatchesPerFrame: number
    }
    mainDrag: {
      driftEvents: number
      batches: number
      dataZoomDispatches: number
      maxDispatchesPerFrame: number
      dragEndFlushed: boolean
    }
    pan: {
      pointerMoves: number
      batches: number
      panEvents: number
      maxPanEventsPerFrame: number
    }
  }
  alignment: {
    resourceRowsInSeries: number
    checkedTasks: number
    missingResourceRows: number
    outOfBoundsTasks: number
    maxTopViolationPx: number
    maxBottomViolationPx: number
    examples: Array<{
      id: string
      resourceIndex: number
      laneIndex: number
      laneCount: number
      taskTop: number
      taskBottom: number
      rowTop: number
      rowBottom: number
    }>
  }
}

const scenarios: Record<ScenarioName, ScenarioConfig> = {
  small: {
    name: 'small',
    assignedTasks: 1_000,
    unassignedTasks: 300,
    resources: 164,
  },
  medium: {
    name: 'medium',
    assignedTasks: 5_000,
    unassignedTasks: 1_000,
    resources: 164,
  },
  peak: {
    name: 'peak',
    assignedTasks: 10_000,
    unassignedTasks: 2_000,
    resources: 164,
  },
}

function selectedScenarios(): ScenarioConfig[] {
  const names = (process.env.PERF_GROUPS || 'small,medium,peak')
    .split(',')
    .map((name) => name.trim())
    .filter((name): name is ScenarioName => name in scenarios)

  return (names.length ? names : ['small', 'medium', 'peak']).map(
    (name) => scenarios[name],
  )
}

function numberFromEnv(name: string, defaultValue: number): number {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : defaultValue
}

function optionalBudget(name: string): number | null {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : null
}

test('fixed Gantt performance baseline', async ({ page }, testInfo) => {
  const scrollSteps = numberFromEnv('PERF_SCROLL_STEPS', 30)
  const updateSteps = numberFromEnv('PERF_UPDATE_STEPS', 8)
  const warmupSteps = numberFromEnv('PERF_WARMUP_STEPS', 5)
  const budgets = {
    scrollDispatchP95Ms: optionalBudget('PERF_MAX_SCROLL_P95_MS'),
    scrollFrameP95Ms: optionalBudget('PERF_MAX_SCROLL_FRAME_P95_MS'),
    updateP95Ms: optionalBudget('PERF_MAX_UPDATE_P95_MS'),
    idlePaints: optionalBudget('PERF_MAX_IDLE_PAINTS'),
  }
  const results: ScenarioResult[] = []
  const pageErrors: string[] = []

  page.on('pageerror', (error) => pageErrors.push(String(error)))

  for (const scenario of selectedScenarios()) {
    const result = await test.step(`measure ${scenario.name}`, async () => {
      await page.goto('/')
      await page.waitForFunction(() => Boolean((window as any).__gantt__))
      await page.waitForTimeout(1_500)

      return page.evaluate(
        async ({
          scenario,
          scrollSteps,
          updateSteps,
          warmupSteps,
        }): Promise<ScenarioResult> => {
          const { assignOverlapLanes } = await import(
            '/src/config/taskTransform.js'
          )
          const percentile = (values: number[], ratio: number): number => {
            if (!values.length) return 0
            const sorted = values
              .slice()
              .sort((left, right) => left - right)
            return sorted[
              Math.min(
                sorted.length - 1,
                Math.floor(sorted.length * ratio),
              )
            ]
          }

          const gantt = (window as any).__gantt__
          const zr = gantt.getZr()
          const model = gantt.getModel()
          const resourceRows = Array.from(
            { length: scenario.resources },
            (_, resourceIndex) => [
              resourceIndex,
              `资源 ${resourceIndex}`,
              `perf-resource-${resourceIndex}`,
              `R${String(resourceIndex).padStart(3, '0')}`,
              resourceIndex % 7 === 0 ? 'OFF' : 'ON',
              { load: [] },
            ],
          )
          const resourceIndexes = resourceRows.map((row: any[]) =>
            Number(row[0]),
          )

          const baseTime = Date.UTC(2025, 10, 10, 4, 0, 0)
          const minute = 60_000
          const assigned: any[][] = []
          let taskSerial = 0

          while (assigned.length < scenario.assignedTasks) {
            const resourceIndex =
              resourceIndexes[taskSerial % resourceIndexes.length]
            const taskIndex = Math.floor(
              taskSerial / resourceIndexes.length,
            )
            const wave = Math.floor(taskIndex / 8)
            const slot = taskIndex % 8
            const start = baseTime + wave * 40 * minute + slot * 3 * minute
            const end = start + 30 * minute
            const id = `perf-${scenario.name}-${taskSerial}`
            const laneSeed = taskSerial % 10

            assigned.push([
              id,
              resourceIndex,
              start,
              end,
              `任务 ${taskSerial}`,
              laneSeed + 1,
              laneSeed % 2 ? '#7EA8C7' : null,
              laneSeed === 9,
              0,
              1,
              `assignment-${taskSerial}`,
              'ACTIVE',
              `shift-${wave}`,
              taskSerial,
              `P${wave}`,
              laneSeed % 2 ? 'A320' : 'B738',
              `机位 ${taskSerial % 20}`,
              laneSeed % 3 === 0,
              laneSeed % 4 === 0,
              laneSeed % 4,
            ])
            taskSerial += 1
          }

          const laidOut = assignOverlapLanes(assigned)
          const unassigned = Array.from(
            { length: scenario.unassignedTasks },
            (_, index) => {
              const start = baseTime + (index % 32) * 12 * minute
              return {
                id: `perf-unassigned-${index}`,
                name: `未分配 ${index}`,
                taskName: `未分配 ${index}`,
                startTime: new Date(start).toISOString(),
                endTime: new Date(start + 25 * minute).toISOString(),
              }
            },
          )

          const laneGroups = new Map<number, any[][]>()
          for (const task of laidOut) {
            const key = task[1]
            const group = laneGroups.get(key) || []
            group.push(task)
            laneGroups.set(key, group)
          }

          let laneConflicts = 0
          let maxLaneCount = 1
          for (const group of laneGroups.values()) {
            for (let index = 0; index < group.length; index += 1) {
              const current = group[index]
              maxLaneCount = Math.max(maxLaneCount, current[9])
              for (
                let candidateIndex = index + 1;
                candidateIndex < group.length;
                candidateIndex += 1
              ) {
                const candidate = group[candidateIndex]
                if (
                  current[8] === candidate[8] &&
                  current[2] < candidate[3] &&
                  candidate[2] < current[3]
                ) {
                  laneConflicts += 1
                }
              }
            }
          }

          const applyStart = performance.now()
          gantt.updateTaskItems({
            data: laidOut,
            affectedIds: laidOut.map((task) => String(task[0])),
            resourceData: resourceRows,
          })
          gantt.updateUnassignedTasks({
            data: unassigned,
            affectedIds: [],
          })
          const applyFixtureMs = performance.now() - applyStart

          await new Promise((resolve) => setTimeout(resolve, 1_800))

          const countActiveAnimators = (): number => {
            const elements: any[] = []
            const walk = (element: any): void => {
              if (!element) return
              elements.push(element)
              if (element.children) {
                for (const child of element.children()) walk(child)
              }
            }
            for (const root of zr.storage._roots || []) walk(root)
            return elements.filter(
              (element) => element.animators?.length,
            ).length
          }

          for (let index = 0; index < warmupSteps; index += 1) {
            gantt.dispatchAction({
              type: 'dataZoom',
              dataZoomId: 'insideY',
              start: 4 + index * 0.5,
              end: 34 + index * 0.5,
            })
            await new Promise((resolve) => setTimeout(resolve, 20))
          }
          gantt.dispatchAction({
            type: 'dataZoom',
            dataZoomId: 'insideY',
            start: 4,
            end: 34,
          })
          await new Promise((resolve) => setTimeout(resolve, 500))

          let idlePaints = 0
          const originalRefresh = zr.painter.refresh.bind(zr.painter)
          zr.painter.refresh = (...args: unknown[]) => {
            idlePaints += 1
            return originalRefresh(...args)
          }
          await new Promise((resolve) => setTimeout(resolve, 1_000))
          zr.painter.refresh = originalRefresh

          const activeAnimatorsAtIdle = countActiveAnimators()

          const scrollDurations: number[] = []
          const frameGaps: number[] = []
          let collectingFrames = true
          let lastFrame = performance.now()
          const frameLoop = (now: number): void => {
            if (!collectingFrames) return
            frameGaps.push(now - lastFrame)
            lastFrame = now
            requestAnimationFrame(frameLoop)
          }
          requestAnimationFrame(frameLoop)

          for (let index = 0; index < scrollSteps; index += 1) {
            const start = 4 + index * 0.65
            const dispatchStart = performance.now()
            gantt.dispatchAction({
              type: 'dataZoom',
              dataZoomId: 'insideY',
              start,
              end: start + 30,
            })
            scrollDurations.push(performance.now() - dispatchStart)
            await new Promise((resolve) => setTimeout(resolve, 35))
          }
          collectingFrames = false

          const target = laidOut[Math.floor(laidOut.length / 2)]
          const updateDurations: number[] = []
          for (let index = 0; index < updateSteps; index += 1) {
            const data = laidOut.map((task) => task.slice())
            const targetIndex = data.findIndex(
              (task) => String(task[0]) === String(target[0]),
            )
            data[targetIndex][4] = `更新 ${scenario.name} ${index}`
            const updateStart = performance.now()
            gantt.updateTaskItems({
              data,
              affectedIds: [String(target[0])],
              resourceData: resourceRows,
            })
            updateDurations.push(performance.now() - updateStart)
            await new Promise((resolve) => setTimeout(resolve, 25))
          }

          const displayObjectsBeforeInteractions =
            zr.storage.getDisplayList(true).length
          const runInteractionMetrics = async (): Promise<
            ScenarioResult['interactions']
          > => {
            const innerKey = Object.keys((gantt as any)._api).find(
              (key) => key.startsWith('__pi_inner_'),
            )
            const inner = innerKey
              ? (gantt as any)._api[innerKey]
              : null
            const coordSysKey = inner?.coordSysRecordMap?.keys?.()[0]
            const controller =
              coordSysKey != null
                ? inner.coordSysRecordMap.get(coordSysKey)?.controller
                : null
            const boardModel = model.getComponent('unassignedBoard')
            const boardView =
              gantt._componentsMap[boardModel.__viewId]
            const mainScrollThumb = boardView?._mainScrollThumb
            const nextFrame = (): Promise<void> =>
              new Promise((resolve) =>
                requestAnimationFrame(() => resolve()),
              )
            const pointerEvent = (x: number, y: number) => ({
              wheelDelta: 0,
              offsetX: x,
              offsetY: y,
              event: {
                shiftKey: false,
                ctrlKey: false,
                altKey: false,
                preventDefault() {},
                stopPropagation() {},
              },
              gestureEvent: null,
              target: null,
            })

            let wheelInputEvents = 0
            let wheelScrollMoveEvents = 0
            let wheelDataZoomDispatches = 0
            let wheelMaxDispatchesPerFrame = 0
            const wheelBatches = 6
            const wheelEventsPerBatch = 4

            if (controller) {
              const onWheelMove = (): void => {
                wheelScrollMoveEvents += 1
              }
              controller.on('scrollMove', onWheelMove)

              const originalDispatch = gantt._api.dispatchAction
              gantt._api.dispatchAction = (payload: any) => {
                if (payload?.type === 'dataZoom') {
                  wheelDataZoomDispatches += 1
                }
                return originalDispatch.call(gantt._api, payload)
              }

              for (let batch = 0; batch < wheelBatches; batch += 1) {
                const before = wheelDataZoomDispatches
                const direction = batch < 3 ? -1 : 1
                for (
                  let eventIndex = 0;
                  eventIndex < wheelEventsPerBatch;
                  eventIndex += 1
                ) {
                  const event = pointerEvent(700, 400)
                  event.wheelDelta = direction
                  controller._mousewheelHandler(event)
                  wheelInputEvents += 1
                }
                await nextFrame()
                wheelMaxDispatchesPerFrame = Math.max(
                  wheelMaxDispatchesPerFrame,
                  wheelDataZoomDispatches - before,
                )
              }

              controller.off('scrollMove', onWheelMove)
              gantt._api.dispatchAction = originalDispatch
            }

            const driftBatches = 6
            const driftEventsPerBatch = 8
            let mainDragEvents = 0
            let mainDragDispatches = 0
            let mainDragMaxDispatchesPerFrame = 0
            let dragEndFlushed = false

            if (mainScrollThumb) {
              const originalBoardDispatch =
                boardView._dispatchVerticalDataZoom.bind(boardView)
              boardView._dispatchVerticalDataZoom = () => {
                mainDragDispatches += 1
              }
              const dragEvent = (y: number) => ({
                offsetY: y,
                event: {
                  stopPropagation() {},
                  preventDefault() {},
                },
              })
              mainScrollThumb.ondragstart(dragEvent(100))

              for (let batch = 0; batch < driftBatches; batch += 1) {
                const before = mainDragDispatches
                for (
                  let eventIndex = 0;
                  eventIndex < driftEventsPerBatch;
                  eventIndex += 1
                ) {
                  mainScrollThumb.drift(
                    0,
                    0,
                    dragEvent(110 + batch * 5 + eventIndex),
                  )
                  mainDragEvents += 1
                }
                await nextFrame()
                mainDragMaxDispatchesPerFrame = Math.max(
                  mainDragMaxDispatchesPerFrame,
                  mainDragDispatches - before,
                )
              }

              const beforeDragEnd = mainDragDispatches
              mainScrollThumb.drift(0, 0, dragEvent(160))
              mainScrollThumb.ondragend(dragEvent(160))
              dragEndFlushed =
                mainDragDispatches === beforeDragEnd + 1
              mainDragEvents += 1
              boardView._dispatchVerticalDataZoom = originalBoardDispatch
            }

            const panBatches = 6
            const panMovesPerBatch = 8
            let pointerMoves = 0
            let panEvents = 0
            let panMaxEventsPerFrame = 0

            if (controller) {
              controller._dragging = true
              controller._x = 700
              controller._y = 500
              const onPan = (): void => {
                panEvents += 1
              }
              controller.on('pan', onPan)

              for (let batch = 0; batch < panBatches; batch += 1) {
                const before = panEvents
                const direction = batch < 3 ? -1 : 1
                for (
                  let moveIndex = 0;
                  moveIndex < panMovesPerBatch;
                  moveIndex += 1
                ) {
                  controller._y += direction * 3
                  controller._mousemoveHandler(
                    pointerEvent(controller._x, controller._y),
                  )
                  pointerMoves += 1
                }
                await nextFrame()
                panMaxEventsPerFrame = Math.max(
                  panMaxEventsPerFrame,
                  panEvents - before,
                )
              }

              controller._mouseupHandler({ which: 1 })
              controller.off('pan', onPan)
            }

            return {
              wheel: {
                inputEvents: wheelInputEvents,
                batches: wheelBatches,
                scrollMoveEvents: wheelScrollMoveEvents,
                dataZoomDispatches: wheelDataZoomDispatches,
                maxDispatchesPerFrame: wheelMaxDispatchesPerFrame,
              },
              mainDrag: {
                driftEvents: mainDragEvents,
                batches: driftBatches,
                dataZoomDispatches: mainDragDispatches,
                maxDispatchesPerFrame:
                  mainDragMaxDispatchesPerFrame,
                dragEndFlushed,
              },
              pan: {
                pointerMoves,
                batches: panBatches,
                panEvents,
                maxPanEventsPerFrame: panMaxEventsPerFrame,
              },
            }
          }

          const settleStart = performance.now()
          while (
            countActiveAnimators() > 0
            && performance.now() - settleStart < 2_500
          ) {
            await new Promise((resolve) =>
              requestAnimationFrame(() => resolve(undefined)),
            )
          }

          const resourceModel = model
            .getSeries()
            .find((seriesModel: any) => seriesModel.id === 'resourceRows')
          const taskModel = model
            .getSeries()
            .find((seriesModel: any) => seriesModel.id === 'assignedTasks')
          const resourceData = resourceModel.getData()
          const resourceStore = resourceData.getStore()
          const taskData = taskModel.getData()
          const taskStore = taskData.getStore()
          const rowMap = new Map<
            number,
            { top: number; bottom: number }
          >()

          for (let index = 0; index < resourceData.count(); index += 1) {
            const row = Number(resourceStore.get(0, index))
            const element = resourceData.getItemGraphicEl(index)
            if (element) {
              rowMap.set(row, {
                top: element.y,
                bottom: element.y,
              })
            }
          }

          const rowTops = [...rowMap.values()]
            .map((row) => row.top)
            .sort((left, right) => left - right)
          const rowHeight =
            rowTops.length > 1 ? rowTops[1] - rowTops[0] : 0
          for (const row of rowMap.values()) {
            row.bottom = row.top + rowHeight
          }

          let checkedTasks = 0
          let missingResourceRows = 0
          let outOfBoundsTasks = 0
          let maxTopViolationPx = 0
          let maxBottomViolationPx = 0
          const alignmentExamples: ScenarioResult['alignment']['examples'] = []

          for (let index = 0; index < taskData.count(); index += 1) {
            const resourceIndex = Number(taskStore.get(1, index))
            const row = rowMap.get(resourceIndex)
            if (!row) {
              missingResourceRows += 1
              continue
            }
            const element = taskData.getItemGraphicEl(index)
            const rect = element
              ?.children?.()
              .find(
                (child: any) =>
                  child.type === 'rect' &&
                  child.shape &&
                  child.shape.height > 0,
              )
            if (!rect) continue

            checkedTasks += 1
            const topViolation = Math.max(0, row.top - rect.shape.y)
            const bottomViolation = Math.max(
              0,
              rect.shape.y + rect.shape.height - row.bottom,
            )
            maxTopViolationPx = Math.max(
              maxTopViolationPx,
              topViolation,
            )
            maxBottomViolationPx = Math.max(
              maxBottomViolationPx,
              bottomViolation,
            )
            if (topViolation > 0.6 || bottomViolation > 0.6) {
              outOfBoundsTasks += 1
              if (alignmentExamples.length < 5) {
                alignmentExamples.push({
                  id: String(taskStore.get(0, index)),
                  resourceIndex,
                  laneIndex: Number(taskStore.get(8, index)),
                  laneCount: Number(taskStore.get(9, index)),
                  taskTop: Number(rect.shape.y.toFixed(2)),
                  taskBottom: Number(
                    (rect.shape.y + rect.shape.height).toFixed(2),
                  ),
                  rowTop: Number(row.top.toFixed(2)),
                  rowBottom: Number(row.bottom.toFixed(2)),
                })
              }
            }
          }

          const interactions = await runInteractionMetrics()

          return {
            scenario: scenario.name,
            fixture: {
              requestedAssignedTasks: scenario.assignedTasks,
              appliedAssignedTasks: laidOut.length,
              requestedUnassignedTasks: scenario.unassignedTasks,
              resources: resourceIndexes.length,
              maxLaneCount,
              laneConflicts,
            },
            timings: {
              applyFixtureMs: Number(applyFixtureMs.toFixed(2)),
              idlePaintsPerSecond: idlePaints,
              scrollDispatch: {
                avg: Number(
                  (
                    scrollDurations.reduce(
                      (total, value) => total + value,
                      0,
                    ) / Math.max(1, scrollDurations.length)
                  ).toFixed(2),
                ),
                p50: Number(percentile(scrollDurations, 0.5).toFixed(2)),
                p95: Number(percentile(scrollDurations, 0.95).toFixed(2)),
                max: Number(Math.max(0, ...scrollDurations).toFixed(2)),
              },
              scrollFrameGap: {
                avg: Number(
                  (
                    frameGaps.reduce(
                      (total, value) => total + value,
                      0,
                    ) / Math.max(1, frameGaps.length)
                  ).toFixed(2),
                ),
                p50: Number(percentile(frameGaps, 0.5).toFixed(2)),
                p95: Number(percentile(frameGaps, 0.95).toFixed(2)),
                max: Number(Math.max(0, ...frameGaps).toFixed(2)),
              },
              singleTaskUpdate: {
                avg: Number(
                  (
                    updateDurations.reduce(
                      (total, value) => total + value,
                      0,
                    ) / Math.max(1, updateDurations.length)
                  ).toFixed(2),
                ),
                p50: Number(percentile(updateDurations, 0.5).toFixed(2)),
                p95: Number(percentile(updateDurations, 0.95).toFixed(2)),
                max: Number(Math.max(0, ...updateDurations).toFixed(2)),
              },
            },
            rendering: {
              displayObjects: displayObjectsBeforeInteractions,
              displayObjectsAfterInteractions:
                zr.storage.getDisplayList(true).length,
              activeAnimatorsAtIdle,
              canvases: document.querySelectorAll('canvas').length,
            },
            interactions,
            alignment: {
              resourceRowsInSeries: rowMap.size,
              checkedTasks,
              missingResourceRows,
              outOfBoundsTasks,
              maxTopViolationPx: Number(maxTopViolationPx.toFixed(2)),
              maxBottomViolationPx: Number(
                maxBottomViolationPx.toFixed(2),
              ),
              examples: alignmentExamples,
            },
          }
        },
        {
          scenario,
          scrollSteps,
          updateSteps,
          warmupSteps,
        },
      )
    })

    results.push(result)
    if (result.alignment.outOfBoundsTasks > 0) {
      console.log(
        `[PERF-ALIGN] ${scenario.name} ` +
          JSON.stringify(result.alignment.examples),
      )
    }

    expect(
      result.fixture.appliedAssignedTasks,
      `${scenario.name} fixture task count`,
    ).toBe(scenario.assignedTasks)
    expect(result.fixture.laneConflicts, 'lane conflicts').toBe(0)
    expect(
      result.alignment.missingResourceRows,
      'tasks without a visible resource row',
    ).toBe(0)
    expect(
      result.alignment.outOfBoundsTasks,
      'tasks outside their resource row',
    ).toBe(0)
    expect(
      result.rendering.activeAnimatorsAtIdle,
      'active animations after fixture settle',
    ).toBe(0)
    expect(
      result.interactions.wheel.inputEvents,
      'wheel input events',
    ).toBeGreaterThan(0)
    expect(
      result.interactions.wheel.scrollMoveEvents,
      'wheel animation-frame batches',
    ).toBe(result.interactions.wheel.batches)
    expect(
      result.interactions.wheel.maxDispatchesPerFrame,
      'wheel dataZoom dispatches per frame',
    ).toBeLessThanOrEqual(1)
    expect(
      result.interactions.mainDrag.driftEvents,
      'main scrollbar drift events',
    ).toBeGreaterThan(0)
    expect(
      result.interactions.mainDrag.maxDispatchesPerFrame,
      'main scrollbar dispatches per frame',
    ).toBeLessThanOrEqual(1)
    expect(
      result.interactions.mainDrag.dragEndFlushed,
      'main scrollbar drag end flush',
    ).toBe(true)
    expect(
      result.interactions.pan.pointerMoves,
      'pointer pan input events',
    ).toBeGreaterThan(0)
    expect(
      result.interactions.pan.panEvents,
      'pointer pan animation-frame batches',
    ).toBe(result.interactions.pan.batches)
    expect(
      result.interactions.pan.maxPanEventsPerFrame,
      'pointer pan events per frame',
    ).toBeLessThanOrEqual(1)

    if (budgets.scrollDispatchP95Ms != null) {
      expect(
        result.timings.scrollDispatch.p95,
        `${scenario.name} scroll P95 budget`,
      ).toBeLessThanOrEqual(budgets.scrollDispatchP95Ms)
    }
    if (budgets.scrollFrameP95Ms != null) {
      expect(
        result.timings.scrollFrameGap.p95,
        `${scenario.name} scroll frame P95 budget`,
      ).toBeLessThanOrEqual(budgets.scrollFrameP95Ms)
    }
    if (budgets.updateP95Ms != null) {
      expect(
        result.timings.singleTaskUpdate.p95,
        `${scenario.name} update P95 budget`,
      ).toBeLessThanOrEqual(budgets.updateP95Ms)
    }
    if (budgets.idlePaints != null) {
      expect(
        result.timings.idlePaintsPerSecond,
        `${scenario.name} idle paint budget`,
      ).toBeLessThanOrEqual(budgets.idlePaints)
    }

    console.log(
      `[PERF] ${scenario.name} scroll p50=${result.timings.scrollDispatch.p50}ms ` +
        `p95=${result.timings.scrollDispatch.p95}ms ` +
        `update p50=${result.timings.singleTaskUpdate.p50}ms ` +
        `p95=${result.timings.singleTaskUpdate.p95}ms ` +
        `display=${result.rendering.displayObjects}`,
    )
  }

  const environment = await page.evaluate(() => {
    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2') || canvas.getContext('webgl')
    const debugInfo = context?.getExtension(
      'WEBGL_debug_renderer_info',
    )
    return {
      userAgent: navigator.userAgent,
      viewport: [window.innerWidth, window.innerHeight],
      devicePixelRatio: window.devicePixelRatio,
      renderer: debugInfo
        ? context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : null,
      vendor: debugInfo
        ? context.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : null,
      hardwareConcurrency: navigator.hardwareConcurrency,
    }
  })

  const report = {
    generatedAt: new Date().toISOString(),
    environment: {
      ...environment,
      platform: process.platform,
      architecture: process.arch,
      node: process.version,
      headless: process.env.PERF_HEADLESS === '1',
    },
    scenarios: results,
    budgets,
    pageErrors,
  }
  const reportDirectory = path.resolve('perf-results')
  fs.mkdirSync(reportDirectory, { recursive: true })
  const timestamp = report.generatedAt.replace(/[:.]/g, '-')
  fs.writeFileSync(
    path.join(reportDirectory, 'latest.json'),
    JSON.stringify(report, null, 2),
  )
  fs.writeFileSync(
    path.join(reportDirectory, `run-${timestamp}.json`),
    JSON.stringify(report, null, 2),
  )
  await testInfo.attach('performance-baseline.json', {
    body: Buffer.from(JSON.stringify(report, null, 2)),
    contentType: 'application/json',
  })

  expect(pageErrors, 'page errors').toEqual([])
})
