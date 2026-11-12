import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import GanttQueryModel from './GanttQueryModel'
import {
  getThemeMode,
  setThemeMode,
  type GanttThemeMode,
} from '../../config/theme'

const injectStyle = (): void => {
  if (document.getElementById('gantt-query-style')) return
  const style = document.createElement('style')
  style.id = 'gantt-query-style'
  style.textContent = `
    .gantt-workspace { container-type: inline-size; }
    .gantt-query-host { position:absolute; z-index:20; inset:0 0 auto; height:112px; max-width:none; font:13px "Microsoft YaHei",sans-serif; pointer-events:none; }
    .gantt-query-host::before { content:''; position:absolute; inset:0 0 auto; height:112px; box-sizing:border-box; background:linear-gradient(to bottom,var(--gantt-surface, #FFFFFF) 0 64px,var(--gantt-panel, #F8FAFC) 64px 100%); border-bottom:1px solid var(--gantt-border, #D8E0E8); box-shadow:0 2px 5px rgba(31,41,55,.04); }
    .gantt-query-host::after { content:''; position:absolute; left:0; right:0; top:64px; height:1px; background:var(--gantt-border-soft, #E7ECF2); }
    .gantt-query__title { position:absolute; top:25px; left:16px; color:var(--gantt-text, #1F2937); font-size:16px; font-weight:700; line-height:24px; white-space:nowrap; }
    .gantt-query { position:absolute; top:18px; right:16px; display:flex; align-items:center; justify-content:flex-end; gap:6px; width:494px; max-width:calc(100% - 32px); height:36px; margin:0; pointer-events:auto; }
    .gantt-query__range { position:absolute; top:27px; left:50%; max-width:calc(100% - 960px); transform:translateX(-50%); color:var(--gantt-text-secondary, #334155); font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none; }
    .gantt-query input,.gantt-query select,.gantt-query button { box-sizing:border-box; height:36px; border:1px solid var(--gantt-axis-line, #CBD5E1); border-radius:6px; font:inherit; color:var(--gantt-text-secondary, #334155); background:var(--gantt-surface, #FFF); }
    .gantt-query input { flex:1; width:0; min-width:0; padding:0 10px; }
    .gantt-query select { width:82px; padding:0 4px; }
    .gantt-query button { padding:0 10px; cursor:pointer; flex-shrink:0; }
    .gantt-query button[type=submit] { color:#FFF; background:var(--gantt-primary, #2F9EEB); border-color:var(--gantt-primary, #2F9EEB); }
    .gantt-query button:hover { filter:brightness(.96); }
    .gantt-query :focus-visible { outline:2px solid var(--gantt-primary, #2F9EEB); outline-offset:2px; }
    .gantt-query__status { position:absolute; top:72px; right:16px; max-width:calc(100% - 32px); font-size:12px; color:var(--gantt-muted, #64748B); text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none; }
    .gantt-query__theme { width:67px; padding:2px !important; display:grid; grid-template-columns:1fr 1fr; gap:0; flex:0 0 67px; }
    .gantt-query__theme button { width:auto; height:30px; padding:0 !important; border:0 !important; border-radius:4px; display:grid; place-items:center; color:var(--gantt-faint, #94A3B8); background:transparent; box-shadow:none; }
    .gantt-query__theme button[aria-pressed=true] { color:var(--gantt-text, #1F2937); background:var(--gantt-surface-raised, #FFFFFF); box-shadow:0 1px 2px rgba(0,0,0,.1); }
    .gantt-query__theme svg { width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; }
    @container (max-width:600px) {
      .gantt-query-host { inset:0 0 auto; width:auto!important; max-width:none; }
      .gantt-query__title { top:20px; }
      .gantt-query { top:16px; right:12px; gap:4px; width:calc(100% - 184px); }
      .gantt-query select { width:68px; }
      .gantt-query button { padding:0 6px; }
      .gantt-query__theme { width:58px; flex-basis:58px; }
      .gantt-query__range { top:84px; left:16px; max-width:calc(100% - 32px); transform:none; }
      .gantt-query__status { top:84px; right:12px; }
    }
  `
  document.head.appendChild(style)
}
export default class GanttQueryView extends ComponentView {
  static type = 'ganttQuery'
  type = GanttQueryView.type
  private _host: HTMLDivElement | null = null
  private _model: GanttQueryModel

  render(model: GanttQueryModel, _piModel: GlobalModel, api: ExtensionAPI): void {
    this._model = model
    this._ensureHost(api)
    const host = this._host
    if (!host) return
    host.style.display = model.get('show') ? 'block' : 'none'
    host.style.width = 'auto'
    host.style.top = '0px'
    host.style.right = `${model.get('right') ?? 16}px`
    const range = this._formatRange(model.get('windowRange'))
    // Preserve focus and unfinished input during Gantt/WS rendering.
    if (host.firstChild) {
      const rangeLabel = host.querySelector<HTMLElement>('.gantt-query__range')
      if (rangeLabel) rangeLabel.textContent = range
      return
    }
    const rangeLabel = document.createElement('div')
    rangeLabel.className = 'gantt-query__range'
    rangeLabel.textContent = range
    rangeLabel.setAttribute('aria-label', `当前甘特时间范围：${range}`)
    const title = document.createElement('div')
    title.className = 'gantt-query__title'
    title.textContent = '资源调度'
    const form = document.createElement('form')
    form.className = 'gantt-query'
    form.setAttribute('role', 'search')
    const themeSwitch = document.createElement('div')
    themeSwitch.className = 'gantt-query__theme'
    themeSwitch.setAttribute('role', 'group')
    themeSwitch.setAttribute('aria-label', '颜色模式')
    const themeButtons: HTMLButtonElement[] = []
    const syncThemeButtons = (): void => {
      const activeMode = getThemeMode()
      themeButtons.forEach((button) => {
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.themeMode === activeMode),
        )
      })
    }
    ;([
      ['light', '亮色模式', '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'],
      ['dark', '暗色模式', '<path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/>'],
    ] as const).forEach(([mode, label, icon]) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.themeMode = mode
      button.title = label
      button.setAttribute('aria-label', label)
      button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>`
      button.onclick = () => {
        if (getThemeMode() === mode) return
        setThemeMode(mode as GanttThemeMode)
        syncThemeButtons()
        api.dispatchAction(
          { type: 'updateTheme', animation: { duration: 0 } },
          { silent: true },
        )
      }
      themeButtons.push(button)
      themeSwitch.appendChild(button)
    })
    syncThemeButtons()
    const condition = document.createElement('select')
    condition.setAttribute('aria-label', '搜索条件')
    ;(model.get('conditions') || ['任务名', '资源名']).forEach((label) => {
      const option = document.createElement('option')
      option.value = option.textContent = label
      condition.appendChild(option)
    })
    const input = document.createElement('input')
    input.type = 'search'
    input.placeholder = model.get('placeholder') || '输入关键词'
    input.setAttribute('aria-label', '搜索关键词')
    input.value = model.get('value') || ''
    const submit = document.createElement('button')
    submit.type = 'submit'
    submit.textContent = '搜索'
    const clear = document.createElement('button')
    clear.type = 'button'
    clear.textContent = '清空'
    const status = document.createElement('output')
    status.className = 'gantt-query__status'
    status.setAttribute('aria-live', 'polite')
    const search = (): void => {
      const keyword = input.value.trim()
      const handler = this._model.get('onSearch')
      if (!handler) { status.textContent = '搜索暂不可用'; return }
      const result = handler({ keyword, condition: condition.value })
      status.textContent = keyword
        ? `已筛选 · ${result ? result.count : 0} 个任务 · 清空可恢复`
        : '已显示全部任务'
    }
    form.onsubmit = (event) => { event.preventDefault(); search() }
    clear.onclick = () => { input.value = ''; this._model.option.value = ''; search(); input.focus() }
    input.oninput = () => { this._model.option.value = input.value; if (!input.value) search() }
    condition.onchange = () => { if (input.value.trim()) search() }
    form.append(themeSwitch, condition, input, submit, clear)
    host.append(title, rangeLabel, form, status)
  }

  dispose(): void { this._host?.remove(); this._host = null }

  private _formatRange(range?: { startTime?: string | number; endTime?: string | number }): string {
    const format = (value?: string | number): string => {
      if (value == null) return ''
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return ''
      const pad = (part: number): string => part < 10 ? `0${part}` : String(part)
      return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
    }
    const start = format(range?.startTime)
    const end = format(range?.endTime)
    return start && end ? `${start} - ${end}` : '甘特时间范围'
  }

  private _ensureHost(api: ExtensionAPI): void {
    if (this._host) return
    injectStyle()
    const zr = api.getZr() as any
    const root = zr.dom || zr.painter?.getViewportRoot?.()
    const parent = root?.parentElement || document.body
    if (parent !== document.body && window.getComputedStyle(parent).position === 'static') parent.style.position = 'relative'
    if (root?.style) root.style.backgroundColor = 'var(--gantt-bg)'
    parent.style.backgroundColor = 'var(--gantt-bg)'
    parent.classList.add('gantt-workspace')
    this._host = document.createElement('div')
    this._host.className = 'gantt-query-host'
    parent.appendChild(this._host)
  }
}
