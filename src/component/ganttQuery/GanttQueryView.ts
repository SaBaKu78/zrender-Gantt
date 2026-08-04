import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import GanttQueryModel from './GanttQueryModel'

const SEARCH_PATH = 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'

const createSearchIcon = (): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', '18')
  svg.setAttribute('height', '18')
  svg.setAttribute('aria-hidden', 'true')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', SEARCH_PATH)
  path.setAttribute('fill', '#334155')
  svg.appendChild(path)
  return svg
}

const createElement = <T extends HTMLElement>(tagName: string, className?: string): T => {
  const element = document.createElement(tagName) as T
  if (className) element.className = className
  return element
}

const injectLiquidGlassFilter = (): void => {
  if (document.getElementById('gantt-query-liquid-glass-svg')) return

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('id', 'gantt-query-liquid-glass-svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.position = 'absolute'
  svg.style.pointerEvents = 'none'
  svg.innerHTML = `
    <defs>
      <filter id="gantt-query-liquid-glass-filter" x="-20%" y="-70%" width="140%" height="240%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.085" numOctaves="2" seed="8" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="6" xChannelSelector="R" yChannelSelector="G" result="refracted" />
        <feColorMatrix in="refracted" type="saturate" values="1.26" />
      </filter>
    </defs>
  `
  document.body.appendChild(svg)
}

const injectStyle = (): void => {
  injectLiquidGlassFilter()
  if (document.getElementById('gantt-query-style')) return

  const style = document.createElement('style')
  style.id = 'gantt-query-style'
  style.textContent = `
    .gantt-query-host {
      position: absolute;
      z-index: 20;
      box-sizing: border-box;
      max-width: calc(100% - 96px);
      isolation: isolate;
    }
    .gantt-query {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 16px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.58);
      border-radius: 22px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(236, 244, 249, 0.28)),
        rgba(255, 255, 255, 0.32);
      box-shadow:
        0 14px 28px rgba(71, 85, 105, 0.15),
        inset 0 1px 1px rgba(255, 255, 255, 0.86),
        inset 0 -12px 22px rgba(148, 163, 184, 0.12);
      transition:
        box-shadow 180ms ease,
        background 180ms ease,
        border-color 180ms ease;
      backdrop-filter: url(#gantt-query-liquid-glass-filter) blur(8px) saturate(1.35);
      -webkit-backdrop-filter: url(#gantt-query-liquid-glass-filter) blur(8px) saturate(1.35);
    }
    .gantt-query-host {
      transition: width 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .gantt-query-host:focus-within {
      width: 360px !important;
    }
    .gantt-query:focus-within {
      box-shadow:
        0 18px 34px rgba(71, 85, 105, 0.18),
        inset 0 1px 1px rgba(255, 255, 255, 0.9),
        inset 0 -12px 22px rgba(148, 163, 184, 0.12);
    }
    .gantt-query::before {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: inherit;
      pointer-events: none;
      background:
        radial-gradient(circle at 16% 0%, rgba(255, 255, 255, 0.95), transparent 32%),
        linear-gradient(115deg, rgba(255, 255, 255, 0.38), transparent 42%);
      opacity: 0.72;
      mix-blend-mode: screen;
    }
    .gantt-query::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow:
        inset 1px 0 2px rgba(255, 255, 255, 0.7),
        inset -1px 0 2px rgba(148, 163, 184, 0.24),
        inset 0 -1px 1px rgba(15, 23, 42, 0.08);
    }
    .gantt-query__icon {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .gantt-query__input {
      position: relative;
      z-index: 1;
      min-width: 0;
      width: 100%;
      height: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: #334155;
      font: 14px Arial, sans-serif;
    }
    .gantt-query__input::placeholder {
      color: #94A3B8;
      opacity: 1;
    }
  `
  document.head.appendChild(style)
}

export default class GanttQueryView extends ComponentView {
  static type = 'ganttQuery'
  type = GanttQueryView.type

  private _host: HTMLDivElement | null = null

  render(model: GanttQueryModel, _piModel: GlobalModel, api: ExtensionAPI): void {
    this._ensureHost(api)
    if (!this._host) return

    this._host.style.display = model.get('show') ? 'block' : 'none'
    this._host.style.width = `${model.get('width') || 336}px`
    this._host.style.top = `${model.get('top') ?? 80}px`
    this._host.style.right = `${model.get('right') ?? 18}px`

    const query = createElement<HTMLDivElement>('div', 'gantt-query')
    const icon = createElement<HTMLSpanElement>('span', 'gantt-query__icon')
    const input = createElement<HTMLInputElement>('input', 'gantt-query__input')
    input.type = 'search'
    input.placeholder = model.get('placeholder') || 'Search'
    input.value = model.get('value') || ''
    icon.appendChild(createSearchIcon())
    query.append(icon, input)
    this._host.replaceChildren(query)
  }

  dispose(): void {
    this._host?.remove()
    this._host = null
  }

  private _ensureHost(api: ExtensionAPI): void {
    if (this._host) return

    injectStyle()
    const zr = api.getZr() as any
    const root = zr.dom || zr.painter?.getViewportRoot?.()
    const parent = root?.parentElement || document.body
    if (parent !== document.body && window.getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative'
    }

    this._host = createElement<HTMLDivElement>('div', 'gantt-query-host')
    parent.appendChild(this._host)
  }
}
