import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import ResourceFilterModel, { ResourceFilterResource } from './ResourceFilterModel'

const TEXT = {
  filter: '资源过滤',
  active: '当前已有过滤条件',
  inactive: '当前没有过滤条件',
  name: '姓名',
  all: '全部资源',
  reset: '重置',
  apply: '应用',
}

const FUNNEL_PATH = 'M435.6 590.6L206.6 247v-76.3h610.8V247l-229 343.6v229L435.6 896V590.6z'

const createElement = (tagName: string, className?: string, text?: string): HTMLElement => {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text) element.textContent = text
  return element
}

const createFunnelIcon = (active: boolean): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 1024 1024')
  svg.setAttribute('width', '16')
  svg.setAttribute('height', '16')
  svg.setAttribute('aria-hidden', 'true')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', FUNNEL_PATH)
  path.setAttribute('fill', active ? '#1296db' : '#8a8a8a')
  svg.appendChild(path)
  return svg
}

const injectStyle = (): void => {
  if (document.getElementById('resource-filter-style')) return

  const style = document.createElement('style')
  style.id = 'resource-filter-style'
  style.textContent = `
    .resource-filter-host {
      position: absolute;
      left: 0;
      top: 80px;
      width: 10%;
      min-width: 180px;
      max-width: 320px;
      height: 40px;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F3F4F6;
      border-bottom: 1px solid #CBD5E1;
      box-sizing: border-box;
      pointer-events: auto;
    }
    .resource-filter {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: Arial, sans-serif;
    }
    .resource-filter__button {
      width: 108px;
      height: 26px;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      color: #334155;
      font-size: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .resource-filter__button:hover {
      border-color: #94A3B8;
      background: #F8FAFC;
    }
    .resource-filter__status {
      min-width: 26px;
      height: 26px;
      padding: 0 6px;
      border: 1px solid #CBD5E1;
      border-radius: 2px;
      background: #FFFFFF;
      color: #64748B;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      line-height: 1;
      box-sizing: border-box;
    }
    .resource-filter__backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(15, 23, 42, 0.24);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 112px 0 0 18px;
      box-sizing: border-box;
    }
    .resource-filter__modal {
      width: 320px;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      background: #FFFFFF;
      box-shadow: 0 14px 36px rgba(15, 23, 42, 0.18);
      color: #111827;
      font-family: Arial, sans-serif;
    }
    .resource-filter__modal-header {
      height: 42px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E5E7EB;
      font-size: 14px;
      font-weight: 600;
    }
    .resource-filter__close {
      width: 26px;
      height: 26px;
      border: 0;
      background: transparent;
      color: #64748B;
      font-size: 20px;
      cursor: pointer;
    }
    .resource-filter__body { padding: 14px; }
    .resource-filter__field {
      display: grid;
      gap: 6px;
      font-size: 12px;
      color: #475569;
    }
    .resource-filter__combobox {
      position: relative;
      display: flex;
      align-items: center;
    }
    .resource-filter__combobox-input {
      width: 100%;
      height: 32px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      padding: 0 30px 0 8px;
      box-sizing: border-box;
      background: #FFFFFF;
      color: #111827;
      font-size: 13px;
      outline: none;
    }
    .resource-filter__combobox-input:focus {
      border-color: #2563EB;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
    }
    .resource-filter__combobox-clear {
      position: absolute;
      right: 4px;
      width: 24px;
      height: 24px;
      border: 0;
      background: transparent;
      color: #94A3B8;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }
    .resource-filter__combobox-clear:hover {
      color: #334155;
    }
    .resource-filter__combobox-menu {
      position: absolute;
      left: 0;
      right: 0;
      top: 36px;
      z-index: 2;
      max-height: 220px;
      overflow-y: auto;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      background: #FFFFFF;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
    }
    .resource-filter__combobox-option {
      min-height: 32px;
      padding: 7px 8px;
      box-sizing: border-box;
      color: #111827;
      font-size: 13px;
      line-height: 18px;
      cursor: pointer;
    }
    .resource-filter__combobox-option:hover,
    .resource-filter__combobox-option--selected {
      background: #EFF6FF;
      color: #1D4ED8;
    }
    .resource-filter__combobox-empty {
      padding: 10px 8px;
      color: #94A3B8;
      font-size: 13px;
    }
    .resource-filter__actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      padding: 12px 14px 14px;
      border-top: 1px solid #E5E7EB;
    }
    .resource-filter__action {
      min-width: 68px;
      height: 30px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      background: #FFFFFF;
      cursor: pointer;
      font-size: 13px;
    }
    .resource-filter__action--primary {
      border-color: #2563EB;
      background: #2563EB;
      color: #FFFFFF;
    }
  `
  document.head.appendChild(style)
}

export default class ResourceFilterView extends ComponentView {
  static type = 'resourceFilter'
  type = ResourceFilterView.type

  private _host: HTMLElement | null = null
  private _currentResourceId: string | number | undefined

  render(model: ResourceFilterModel, _piModel: GlobalModel, api: ExtensionAPI): void {
    this.group.removeAll()
    this._ensureHost(api)

    if (!this._host) return
    if (!model.get('show')) {
      this._host.style.display = 'none'
      return
    }

    this._host.style.display = 'flex'
    const resources = model.get('resources') || []
    const allValue = model.get('allValue') || '__ALL__'
    this._currentResourceId = this._readCurrentValue(model, allValue)

    this._renderControl(model, resources, allValue)
  }

  dispose(): void {
    this._host?.remove()
    this._host = null
  }

  private _ensureHost(api: ExtensionAPI): void {
    if (this._host) return

    injectStyle()
    const zr = api.getZr() as any
    const root = zr.dom || zr.painter?.getViewportRoot?.() || zr.painter?.getViewportRootOffset?.()?.dom
    const parent = root?.parentElement || document.body
    if (parent !== document.body) {
      const position = window.getComputedStyle(parent).position
      if (position === 'static') {
        parent.style.position = 'relative'
      }
    }

    this._host = createElement('div', 'resource-filter-host')
    parent.appendChild(this._host)
  }

  private _readCurrentValue(model: ResourceFilterModel, allValue: string): string | number {
    const optionValue = model.get('value')
    if (optionValue != null) return optionValue

    const storageKey = model.get('storageKey')
    if (!storageKey) return allValue

    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey) || '{}')
      return stored.resourceId || allValue
    } catch (_error) {
      return allValue
    }
  }

  private _writeStoredValue(model: ResourceFilterModel, resourceId: string | number): void {
    const storageKey = model.get('storageKey')
    if (!storageKey) return

    window.localStorage.setItem(storageKey, JSON.stringify({ resourceId }))
  }

  private _getVisibleResources(
    resources: ResourceFilterResource[],
    allValue: string,
    resourceId: string | number | undefined
  ): ResourceFilterResource[] {
    if (!resourceId || resourceId === allValue) return resources

    return resources.filter((item) => String(item[1]) === String(resourceId))
  }

  private _renderControl(
    model: ResourceFilterModel,
    resources: ResourceFilterResource[],
    allValue: string
  ): void {
    if (!this._host) return

    const wrapper = createElement('div', 'resource-filter')
    const button = createElement('button', 'resource-filter__button') as HTMLButtonElement
    const buttonLabel = createElement('span', '', TEXT.filter)
    const status = createElement('span', 'resource-filter__status')
    const active = !!this._currentResourceId && this._currentResourceId !== allValue
    const visibleResources = this._getVisibleResources(resources, allValue, this._currentResourceId)

    button.type = 'button'
    button.append(createFunnelIcon(active), buttonLabel)
    button.onclick = () => this._openModal(model, resources, allValue)
    status.textContent = String(visibleResources.length)
    status.title = active ? TEXT.active : TEXT.inactive
    wrapper.append(button, status)
    this._host.replaceChildren(wrapper)
  }

  private _openModal(
    model: ResourceFilterModel,
    resources: ResourceFilterResource[],
    allValue: string
  ): void {
    const backdrop = createElement('div', 'resource-filter__backdrop')
    const modal = createElement('div', 'resource-filter__modal')
    const header = createElement('div', 'resource-filter__modal-header')
    const title = createElement('span', '', TEXT.filter)
    const closeButton = createElement('button', 'resource-filter__close', '×') as HTMLButtonElement
    const body = createElement('div', 'resource-filter__body')
    const field = createElement('label', 'resource-filter__field')
    const fieldTitle = createElement('span', '', TEXT.name)
    const combobox = createElement('div', 'resource-filter__combobox')
    const comboboxInput = createElement('input', 'resource-filter__combobox-input') as HTMLInputElement
    const comboboxClear = createElement('button', 'resource-filter__combobox-clear', '×') as HTMLButtonElement
    const comboboxMenu = createElement('div', 'resource-filter__combobox-menu')
    const actions = createElement('div', 'resource-filter__actions')
    const resetButton = createElement('button', 'resource-filter__action', TEXT.reset) as HTMLButtonElement
    const applyButton = createElement('button', 'resource-filter__action resource-filter__action--primary', TEXT.apply) as HTMLButtonElement

    closeButton.type = 'button'
    resetButton.type = 'button'
    applyButton.type = 'button'
    comboboxInput.type = 'text'
    comboboxInput.placeholder = '搜索资源名称或编号'
    comboboxInput.setAttribute('aria-label', '搜索资源名称或编号')
    comboboxInput.setAttribute('role', 'combobox')
    comboboxInput.setAttribute('aria-expanded', 'false')
    comboboxClear.type = 'button'
    comboboxClear.title = '清除选择'
    comboboxClear.setAttribute('aria-label', '清除选择')
    comboboxMenu.setAttribute('role', 'listbox')
    comboboxMenu.hidden = true

    let query = ''
    let menuOpen = false
    const selectedValue = () => this._currentResourceId
      ? String(this._currentResourceId)
      : allValue
    const resourceLabel = (resourceId: string | number): string => {
      if (resourceId === allValue) return TEXT.all
      const resource = resources.find((item) => String(item[1]) === String(resourceId))
      return resource ? resource[0] || String(resource[1]) : ''
    }

    const renderOptions = (): void => {
      const normalizedQuery = query.trim().toLocaleLowerCase()
      const filteredResources = resources.filter(([name, id]) => {
        if (!normalizedQuery) return true
        return `${name || ''} ${id}`.toLocaleLowerCase().includes(normalizedQuery)
      })

      comboboxMenu.replaceChildren()
      const options = [
        [TEXT.all, allValue] as ResourceFilterResource,
        ...filteredResources,
      ]

      options.forEach(([name, id]) => {
        const option = createElement(
          'div',
          `resource-filter__combobox-option${String(id) === selectedValue() ? ' resource-filter__combobox-option--selected' : ''}`,
          name || String(id),
        )
        option.setAttribute('role', 'option')
        option.setAttribute('aria-selected', String(id) === selectedValue() ? 'true' : 'false')
        option.onmousedown = (event) => {
          event.preventDefault()
          this._currentResourceId = id
          query = ''
          renderInputValue()
          closeMenu()
          renderOptions()
        }
        comboboxMenu.appendChild(option)
      })

      if (!options.length) {
        comboboxMenu.appendChild(createElement('div', 'resource-filter__combobox-empty', '暂无匹配资源'))
      }
    }

    const openMenu = (): void => {
      menuOpen = true
      comboboxMenu.hidden = false
      comboboxInput.setAttribute('aria-expanded', 'true')
      renderOptions()
    }
    const closeMenu = (): void => {
      menuOpen = false
      comboboxMenu.hidden = true
      comboboxInput.setAttribute('aria-expanded', 'false')
    }

    const renderInputValue = (): void => {
      comboboxInput.value = query || resourceLabel(selectedValue())
    }

    renderInputValue()
    renderOptions()

    const applyValue = (resourceId: string | number): void => {
      this._currentResourceId = resourceId
      this._writeStoredValue(model, resourceId)
      const visibleResources = this._getVisibleResources(resources, allValue, resourceId)
      this._renderControl(model, resources, allValue)
      model.get('onChange')?.({
        filter: { resourceId },
        visibleResources,
      })
      backdrop.remove()
    }

    closeButton.onclick = () => backdrop.remove()
    resetButton.onclick = () => applyValue(allValue)
    applyButton.onclick = () => applyValue(selectedValue())
    comboboxInput.onfocus = () => {
      if (!query) {
        comboboxInput.value = ''
      }
      openMenu()
    }
    comboboxInput.onclick = openMenu
    comboboxInput.onblur = () => {
      window.setTimeout(() => {
        if (!combobox.contains(document.activeElement)) {
          query = ''
          renderInputValue()
          closeMenu()
        }
      }, 0)
    }
    comboboxInput.oninput = () => {
      query = comboboxInput.value
      menuOpen = true
      comboboxMenu.hidden = false
      comboboxInput.setAttribute('aria-expanded', 'true')
      renderOptions()
    }
    comboboxInput.onkeydown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    comboboxClear.onclick = () => {
      this._currentResourceId = allValue
      query = ''
      renderInputValue()
      openMenu()
      comboboxInput.focus()
    }
    backdrop.onclick = (event) => {
      if (event.target === backdrop) backdrop.remove()
    }

    header.append(title, closeButton)
    combobox.append(comboboxInput, comboboxClear, comboboxMenu)
    field.append(fieldTitle, combobox)
    body.appendChild(field)
    actions.append(resetButton, applyButton)
    modal.append(header, body, actions)
    backdrop.appendChild(modal)
    document.body.appendChild(backdrop)
  }
}
