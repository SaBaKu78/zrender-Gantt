import { describe, expect, it, vi } from 'vitest'
import CustomSeriesView from '../../src/component/custom/CustomView'
import { customInnerStore } from '../../src/component/custom/CustomModel'
import { TaskRenderItem } from '../../src/config/renderTask'

// Node exposes navigator in recent versions; zrender would mistake it for a browser.
vi.hoisted(() => { vi.stubGlobal('navigator', undefined) })

// Exercise the real custom-series element creation path, not just render options.
function renderTask(status, width = 260, locked = false, showUnlock = false, overrides = {}) {
  const values = ['task-1', 0, 10, 10 + width, '登机口保障', status, null, false, 0, 1,
    null, null, null, null, 'CA1234', 'A320', 'A12', locked, showUnlock, 0]
  Object.assign(values, overrides)
  let graphic
  const diff = {
    add(callback) { this.onAdd = callback; return this },
    remove() { return this },
    update() { return this },
    execute() { this.onAdd(0) },
  }
  const data = {
    diff: () => diff,
    getRawIndex: () => 0,
    getDimensionIndex: (dim) => dim,
    getStore: () => ({ get: (dim) => values[dim] }),
    setItemGraphicEl: (_index, element) => { graphic = element },
  }
  const model = {
    getData: () => data,
    get: (key) => key === 'renderItem' ? TaskRenderItem : false,
    isAnimationEnabled: () => false,
    coordinateSystem: {
      prepareCustoms: () => ({
        coordSys: { x: 0, y: 0, width: 500, height: 100 },
        api: { coord: ([x]) => [x, 0], size: () => [0, 44] },
      }),
    },
    currentZ: 2,
    currentZLevel: 0,
  }
  new CustomSeriesView().render(model, {}, {}, null)
  return graphic
}

describe('task card custom-series rendering', () => {
  it('constructs all status and notification combinations at different card widths', () => {
    for (let status = 1; status <= 10; status++) {
      for (let notifyStatus = 0; notifyStatus <= 3; notifyStatus++) {
        for (const width of [260, 100, 60, 20]) {
          for (const locked of [false, true]) {
            expect(renderTask(status, width, locked, false, { 19: notifyStatus })).toBeTruthy()
          }
        }
      }
    }
  })

  it('keeps notification and lock followed by the designed task icon and short code', () => {
    const graphic = renderTask(2, 260, true, false, { 19: 2 })
    const state = graphic.childOfName('taskState')
    expect(state.childrenRef().map((child) => child.name))
      .toEqual(['taskNotifyIcon', 'taskLockIcon', 'taskStatusIcon', 'taskStatusCode'])
    expect(state.childOfName('taskStatusCode').style.text).toBe('到')
    expect(graphic.childOfName('taskLockIcon')).toBeUndefined()
    expect(state.childOfName('taskLockIcon').y).toBe(0)
  })

  it('uses the exact notification colors and shapes and omits unknown notification states', () => {
    for (const [notifyStatus, fill] of [[0, 'none'], [1, '#0EE3CC'], [2, '#3391E6']]) {
      const state = renderTask(3, 260, false, false, { 19: notifyStatus }).childOfName('taskState')
      const icon = state.childOfName('taskNotifyIcon')
      expect(icon.childAt(0).type).toBe('rect')
      expect(icon.childAt(0).style.fill).toBe(fill)
      if (notifyStatus === 2) expect(icon.childAt(1).style.stroke).toBe('#FFFFFF')
    }
    const cancelled = renderTask(3, 260, false, false, { 19: 3 }).childOfName('taskState').childOfName('taskNotifyIcon')
    expect(cancelled.childrenRef()).toHaveLength(2)
    expect(cancelled.childrenRef().every((child) => child.type === 'line' && child.style.stroke === '#FF0000')).toBe(true)
    for (const notifyStatus of [null, undefined, '', 99]) {
      const state = renderTask(1, 260, false, false, { 19: notifyStatus }).childOfName('taskState')
      expect(state.childOfName('taskNotifyIcon')).toBeUndefined()
    }
  })

  it('renders the exact single-character task codes with a persistent unlocked icon', () => {
    const codes = { 1: '未', 2: '到', 3: '始', 4: '结', 5: '阻', 6: '继', 7: '取', 8: '恢', 9: '挂', 10: '挂' }
    for (const [status, code] of Object.entries(codes)) {
      const state = renderTask(status, 260, false, true).childOfName('taskState')
      expect(state.childOfName('taskStatusCode').style.text).toBe(code)
      expect(customInnerStore(state.childOfName('taskLockIcon')).info.locked).toBe(false)
    }
  })

  it('defaults missing lock state to unlocked and uses distinct lock paths', () => {
    const locked = renderTask(2, 260, true).childOfName('taskState').childOfName('taskLockIcon')
    expect(customInnerStore(locked).info.locked).toBe(true)
    for (const value of [false, null, undefined]) {
      const unlocked = renderTask(2, 260, false, false, { 17: value }).childOfName('taskState').childOfName('taskLockIcon')
      expect(customInnerStore(unlocked).info.locked).toBe(false)
      expect(unlocked.getBoundingRect().width).toBeGreaterThan(0)
      expect(Array.from(unlocked.path.data)).not.toEqual(Array.from(locked.path.data))
    }
  })

  it('renders the designed icon for every task status, including the arrival flag', () => {
    const icons = {
      1: 'clock', 2: 'flag', 3: 'play', 4: 'check', 5: 'warning',
      6: 'arrow', 7: 'cancel', 8: 'restore', 9: 'pause', 10: 'hold',
    }
    for (const [status, iconName] of Object.entries(icons)) {
      const icon = renderTask(status, 260, true).childOfName('taskState').childOfName('taskStatusIcon')
      expect(customInnerStore(icon).info.iconName).toBe(iconName)
      expect(icon.childrenRef().length).toBeGreaterThan(0)
    }
  })

  it('separates status groups by 4px and the task icon and code by 2px', () => {
    const state = renderTask(4, 260, true).childOfName('taskState')
    const size = customInnerStore(state).info.iconSize
    const notify = state.childOfName('taskNotifyIcon')
    const lock = state.childOfName('taskLockIcon')
    const taskIcon = state.childOfName('taskStatusIcon')
    const code = state.childOfName('taskStatusCode')
    expect(lock.shape.x - (notify.x + size / 2)).toBeCloseTo(4)
    expect(taskIcon.x - size / 2 - (lock.shape.x + size)).toBeCloseTo(4)
    expect(code.style.x - (taskIcon.x + size / 2)).toBeCloseTo(2)
  })

  it('drops duplicate state text first and preserves critical icons and compact titles', () => {
    for (const width of [84, 100, 150]) {
      const state = renderTask(5, width, true).childOfName('taskState')
      expect(state.childOfName('taskStatusIcon')).toBeTruthy()
      expect(state.childOfName('taskLockIcon')).toBeTruthy()
      expect(state.childOfName('taskStatusCode')).toBeUndefined()
    }
    const compact = renderTask(5, 60, true)
    expect(compact.childOfName('taskTitle').style.text.length).toBeGreaterThan(0)
    expect(compact.childOfName('taskState').childOfName('taskStatusIcon')).toBeTruthy()
    for (const locked of [true, false]) {
      const tiny = renderTask(5, 20, locked)
      expect(customInnerStore(tiny.childOfName('taskState').childOfName('taskLockIcon')).info.locked).toBe(locked)
    }
  })

  it('keeps compact state content inside narrow cards', () => {
    for (const width of [84, 100, 150, 260, 60, 42, 20]) {
      const graphic = renderTask(4, width, true, false, { 19: 2 })
      const state = graphic.childOfName('taskState')
      const card = graphic.childAt(0).shape
      expect(state.x).toBeGreaterThanOrEqual(card.x)
      expect(state.x + customInnerStore(state).info.width).toBeLessThanOrEqual(card.x + card.width)
      const title = graphic.childOfName('taskTitle')
      if (title) {
        const rect = title.getBoundingRect()
        expect(state.x - (rect.x + rect.width)).toBeCloseTo(5)
      }
    }
  })

  it('adds a solid 4px tab on the left without overlapping card content', () => {
    const graphic = renderTask(4, 260, true)
    const card = graphic.childAt(0)
    const tab = graphic.childOfName('taskStatusTab')
    expect(tab.shape.width).toBe(4)
    expect(tab.shape.x).toBeCloseTo(card.shape.x + 0.5)
    expect(tab.shape.height).toBe(card.shape.height - 1)
    expect(tab.style.fill).toBe('#7CA88E')
    expect(graphic.childOfName('taskStart').style.x).toBeGreaterThan(tab.shape.x + tab.shape.width)
    expect(graphic.childOfName('taskFlight').style.x).toBeGreaterThan(tab.shape.x + tab.shape.width)
  })

  it('softens backend colors instead of drawing bright custom borders', () => {
    const graphic = renderTask(2, 260, false, false, { 6: '#FAAD14' })
    const card = graphic.childAt(0)
    expect(card.style.stroke).not.toBe('#FAAD14')
    expect(card.style.lineWidth).toBe(1)
    expect(card.style.fill).toBe('#F1F6FA')
  })

  it('places start/status/end above flight/task/stand in matching columns', () => {
    const graphic = renderTask(4, 260, true)
    const start = graphic.childOfName('taskStart')
    const status = graphic.childOfName('taskState')
    const end = graphic.childOfName('taskEnd')
    const flight = graphic.childOfName('taskFlight')
    const content = graphic.childOfName('taskContent')
    const location = graphic.childOfName('taskLocation')
    expect(flight.style.text).toBe('CA1234')
    expect(content.style.text).toBe('登机口保障')
    expect(location.style.text).toBe('A12')
    expect(start.style.x).toBe(flight.style.x)
    expect(status.x + customInnerStore(status).info.width / 2).toBeCloseTo(content.style.x)
    expect(end.style.x).toBe(location.style.x)
    expect(start.style.y).toBe(status.y)
    expect(start.style.y).toBe(end.style.y)
    expect(flight.style.y).toBe(content.style.y)
    expect(flight.style.y).toBe(location.style.y)
    expect(flight.style.y).toBeGreaterThan(start.style.y)
    expect(graphic.childOfName('taskAircraft')).toBeUndefined()
    expect(graphic.childrenRef().some((element) => element.type === 'line')).toBe(false)
  })

  it('leaves missing flight and stand empty without duplicating the task name', () => {
    const graphic = renderTask(4, 190, false, false, { 4: '进港', 14: '', 15: '', 16: '' })
    expect(graphic.childOfName('taskContent').style.text).toBe('进港')
    expect(graphic.childOfName('taskFlight')).toBeUndefined()
    expect(graphic.childOfName('taskTitle')).toBeUndefined()
    expect(graphic.childOfName('taskLocation')).toBeUndefined()
    const labels = []
    graphic.traverse((element) => { if (element.type === 'text') labels.push(element.style.text) })
    expect(labels.filter((text) => text === '进港')).toHaveLength(1)
  })
})
