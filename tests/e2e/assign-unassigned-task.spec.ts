import { expect, test } from '@playwright/test'

test('将下方未分配任务派遣到上方第一条资源', async ({ page }) => {
  await page.goto('/')

  const canvas = page.locator('canvas').first()
  await expect(canvas).toBeVisible()
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__gantt__))).toBe(true)

  const getElementCenter = async (testId: string) => page.evaluate((id) => {
    const gantt = (window as any).__gantt__
    const element = gantt.getZr().storage
      .getDisplayList(true)
      .find((item: any) => item.__testId === id)

    if (!element) return null
    const rect = element.getBoundingRect()
    const center = element.transformCoordToGlobal(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2,
    )
    return { x: center[0], y: center[1] }
  }, testId)

  const splitHandle = await getElementCenter('horizontal-split-handle')
  if (!splitHandle) throw new Error('找不到水平分割线手柄')

  const canvasBox = await canvas.boundingBox()
  if (!canvasBox) throw new Error('找不到甘特图 Canvas')

  // 默认未分配面板接近收起状态，先把分割线拖到画布高度的 70%。
  await page.mouse.move(canvasBox.x + splitHandle.x, canvasBox.y + splitHandle.y)
  await page.mouse.down()
  await page.mouse.move(
    canvasBox.x + splitHandle.x,
    canvasBox.y + canvasBox.height * 0.70,
    { steps: 10 },
  )
  await page.mouse.up()

  await expect.poll(async () => {
    return page.evaluate(() => {
      const gantt = (window as any).__gantt__
      const element = gantt.getZr().storage
        .getDisplayList(true)
        .find((item: any) => String(item.__testId || '').startsWith('unassigned-task-'))
      if (!element) return null

      const rect = element.getBoundingRect()
      const center = element.transformCoordToGlobal(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
      )
      return { x: center[0], y: center[1] }
    })
  }).not.toBeNull()

  // poll 的断言不返回值，重新读取已渲染任务的准确中心点。
  const renderedTask = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const element = gantt.getZr().storage
      .getDisplayList(true)
      .find((item: any) => String(item.__testId || '').startsWith('unassigned-task-'))
    const rect = element.getBoundingRect()
    const center = element.transformCoordToGlobal(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2,
    )
    return {
      x: center[0],
      y: center[1],
      taskId: String(element.__testId).replace('unassigned-task-', ''),
    }
  })

  // 双击任务进入 selected 状态，再移动到第一条资源行并点击确认。
  await page.mouse.dblclick(
    canvasBox.x + renderedTask.x,
    canvasBox.y + renderedTask.y,
  )
  const resourcePoint = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const grid = gantt.getModel().getComponent('grid').coordinateSystem
    const rect = grid.getRect()
    const yAxis = grid.getCartesians()[0].getAxis('y')
    return {
      x: rect.x + Math.min(120, rect.width / 2),
      y: yAxis.toGlobalCoord(yAxis.dataToCoord(0)),
    }
  })
  await page.mouse.move(
    canvasBox.x + resourcePoint.x,
    canvasBox.y + resourcePoint.y,
  )
  await page.mouse.click(
    canvasBox.x + resourcePoint.x,
    canvasBox.y + resourcePoint.y,
  )

  // MockJS 在浏览器内拦截 XHR，Playwright 看不到真实 network request。
  // 因此验证最终业务状态：任务离开未分配面板，并进入已分配任务系列。
  await expect.poll(() => page.evaluate((taskId) => {
    const gantt = (window as any).__gantt__
    const option = gantt.getOption()
    const assignedSeries = (option.series || []).find(
      (series: any) => series.id === 'assignedTasks',
    )
    const unassignedBoard = Array.isArray(option.unassignedBoard)
      ? option.unassignedBoard[0]
      : option.unassignedBoard

    return {
      assigned: (assignedSeries?.data || []).some(
        (row: any[]) => String(row[0]) === taskId,
      ),
      unassigned: (unassignedBoard?.data || []).some(
        (task: any) => String(task.id ?? task.taskId) === taskId,
      ),
    }
  }, renderedTask.taskId)).toEqual({ assigned: true, unassigned: false })
})
