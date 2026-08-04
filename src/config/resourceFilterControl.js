const STORAGE_KEY = 'gantt.resourceFilter'
const ALL_RESOURCE_VALUE = '__ALL__'

const TEXT = {
  filter: '\u8d44\u6e90\u8fc7\u6ee4',
  active: '\u5f53\u524d\u5df2\u6709\u8fc7\u6ee4\u6761\u4ef6',
  inactive: '\u5f53\u524d\u6ca1\u6709\u8fc7\u6ee4\u6761\u4ef6',
  name: '\u59d3\u540d',
  all: '\u5168\u90e8\u8d44\u6e90',
  reset: '\u91cd\u7f6e',
  apply: '\u5e94\u7528',
}

const readStoredFilter = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch (_error) {
    return {}
  }
}

const writeStoredFilter = (filter) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filter))
}

const FUNNEL_PATH = 'M435.6 590.6L206.6 247v-76.3h610.8V247l-229 343.6v229L435.6 896V590.6z'

const createFunnelIcon = (active) => {
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

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName)
  if (className) element.className = className
  if (text) element.textContent = text
  return element
}

const getVisibleResources = (resources, filter) => {
  if (!filter?.resourceId || filter.resourceId === ALL_RESOURCE_VALUE) {
    return resources
  }

  return resources.filter((item) => String(item[1]) === String(filter.resourceId))
}

const injectResourceFilterStyle = () => {
  if (document.getElementById('resource-filter-style')) return

  const style = document.createElement('style')
  style.id = 'resource-filter-style'
  style.textContent = `
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
    .resource-filter__status--active {
      color: #64748B;
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
    .resource-filter__body {
      padding: 14px;
    }
    .resource-filter__field {
      display: grid;
      gap: 6px;
      font-size: 12px;
      color: #475569;
    }
    .resource-filter__select {
      height: 32px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      padding: 0 8px;
      background: #FFFFFF;
      color: #111827;
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

export const installResourceFilterControl = ({ root, resources, onChange }) => {
  if (!root) return

  injectResourceFilterStyle()

  let currentFilter = readStoredFilter()
  const wrapper = createElement('div', 'resource-filter')
  const button = createElement('button', 'resource-filter__button')
  const buttonLabel = createElement('span', '', TEXT.filter)
  const status = createElement('span', 'resource-filter__status')
  button.append(createFunnelIcon(false), buttonLabel)

  button.type = 'button'
  status.title = TEXT.inactive
  wrapper.append(button, status)
  root.replaceChildren(wrapper)

  const isActive = () => !!currentFilter.resourceId && currentFilter.resourceId !== ALL_RESOURCE_VALUE

  const updateStatus = () => {
    const active = isActive()
    status.textContent = String(getVisibleResources(resources, currentFilter).length)
    status.classList.toggle('resource-filter__status--active', active)
    button.replaceChildren(createFunnelIcon(active), buttonLabel)
    status.title = active ? TEXT.active : TEXT.inactive
  }

  const applyFilter = () => {
    updateStatus()
    const nextState = {
      filter: currentFilter,
      visibleResources: getVisibleResources(resources, currentFilter),
    }
    window.requestAnimationFrame(() => {
      onChange(nextState)
    })
  }

  const openModal = () => {
    const backdrop = createElement('div', 'resource-filter__backdrop')
    const modal = createElement('div', 'resource-filter__modal')
    const header = createElement('div', 'resource-filter__modal-header')
    const title = createElement('span', '', TEXT.filter)
    const closeButton = createElement('button', 'resource-filter__close', '\u00d7')
    const body = createElement('div', 'resource-filter__body')
    const field = createElement('label', 'resource-filter__field')
    const fieldTitle = createElement('span', '', TEXT.name)
    const select = createElement('select', 'resource-filter__select')
    const actions = createElement('div', 'resource-filter__actions')
    const resetButton = createElement('button', 'resource-filter__action', TEXT.reset)
    const applyButton = createElement('button', 'resource-filter__action resource-filter__action--primary', TEXT.apply)

    closeButton.type = 'button'
    resetButton.type = 'button'
    applyButton.type = 'button'

    const allOption = document.createElement('option')
    allOption.value = ALL_RESOURCE_VALUE
    allOption.textContent = TEXT.all
    select.appendChild(allOption)

    resources.forEach(([name, id]) => {
      const option = document.createElement('option')
      option.value = String(id)
      option.textContent = name || String(id)
      select.appendChild(option)
    })

    select.value = currentFilter.resourceId ? String(currentFilter.resourceId) : ALL_RESOURCE_VALUE

    closeButton.onclick = () => backdrop.remove()
    resetButton.onclick = () => {
      currentFilter = { resourceId: ALL_RESOURCE_VALUE }
      writeStoredFilter(currentFilter)
      applyFilter()
      backdrop.remove()
    }
    applyButton.onclick = () => {
      currentFilter = { resourceId: select.value }
      writeStoredFilter(currentFilter)
      applyFilter()
      backdrop.remove()
    }
    backdrop.onclick = (event) => {
      if (event.target === backdrop) backdrop.remove()
    }

    header.append(title, closeButton)
    field.append(fieldTitle, select)
    body.appendChild(field)
    actions.append(resetButton, applyButton)
    modal.append(header, body, actions)
    backdrop.appendChild(modal)
    document.body.appendChild(backdrop)
  }

  button.onclick = openModal
  applyFilter()
}
