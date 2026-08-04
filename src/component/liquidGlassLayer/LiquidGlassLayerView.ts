import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import LiquidGlassLayerModel from './LiquidGlassLayerModel'

const GLASS_WIDTH = 210
const GLASS_HEIGHT = 150
const GLASS_RADIUS = 75

const createElement = <T extends HTMLElement>(tagName: string, className?: string): T => {
  const element = document.createElement(tagName) as T
  if (className) element.className = className
  return element
}

const createMapDataUri = (type: 'magnify' | 'edge' | 'specular'): string => {
  const content =
    type === 'magnify'
      ? `
        <defs>
          <radialGradient id="m" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="rgb(128,128,128)" />
            <stop offset="52%" stop-color="rgb(160,112,128)" />
            <stop offset="100%" stop-color="rgb(128,128,128)" />
          </radialGradient>
        </defs>
        <rect width="210" height="150" fill="rgb(128,128,128)" />
        <ellipse cx="105" cy="75" rx="86" ry="58" fill="url(#m)" />
      `
      : type === 'edge'
      ? `
        <defs>
          <radialGradient id="d" cx="50%" cy="50%" r="64%">
            <stop offset="0%" stop-color="rgb(128,128,128)" />
            <stop offset="56%" stop-color="rgb(128,128,128)" />
            <stop offset="82%" stop-color="rgb(230,36,128)" />
            <stop offset="100%" stop-color="rgb(38,220,128)" />
          </radialGradient>
        </defs>
        <rect width="210" height="150" fill="rgb(128,128,128)" />
        <ellipse cx="105" cy="75" rx="104" ry="74" fill="url(#d)" />
      `
      : `
        <defs>
          <radialGradient id="s" cx="28%" cy="12%" r="92%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.95)" />
            <stop offset="30%" stop-color="rgba(255,255,255,0.45)" />
            <stop offset="72%" stop-color="rgba(255,255,255,0.08)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="210" height="150" fill="rgba(0,0,0,0)" />
        <ellipse cx="105" cy="75" rx="101" ry="72" fill="url(#s)" />
      `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${GLASS_WIDTH}" height="${GLASS_HEIGHT}" viewBox="0 0 ${GLASS_WIDTH} ${GLASS_HEIGHT}">
      ${content}
    </svg>
  `)}`
}

const injectStyle = (): void => {
  if (document.getElementById('liquid-glass-layer-style')) return

  const style = document.createElement('style')
  style.id = 'liquid-glass-layer-style'
  style.textContent = `
    .liquid-glass-layer-host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: visible;
    }
    .liquid-glass-widget {
      position: absolute;
      pointer-events: auto;
      box-sizing: border-box;
      width: ${GLASS_WIDTH}px;
      height: ${GLASS_HEIGHT}px;
      border-radius: ${GLASS_RADIUS}px;
      cursor: grab;
      user-select: none;
      touch-action: none;
      transform: scaleY(0.8);
      transform-origin: center;
      transition: transform 160ms ease;
    }
    .liquid-glass-widget:active {
      cursor: grabbing;
      transform: scaleY(0.8) scale(1.035);
    }
    .liquid-glass-widget__lens {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid rgba(0, 0, 0, 0.1);
      backdrop-filter: url(#magnifying-glass-filter);
      -webkit-backdrop-filter: url(#magnifying-glass-filter);
      box-shadow:
        rgba(0, 0, 0, 0.16) 0 4px 9px,
        rgba(0, 0, 0, 0.2) 0 2px 24px inset,
        rgba(255, 255, 255, 0.2) 0 -2px 24px inset;
    }
    .liquid-glass-widget__content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(51, 65, 85, 0.72);
      font: 600 13px Arial, sans-serif;
      pointer-events: none;
    }
  `
  document.head.appendChild(style)
}

const createFilterSvg = (): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('color-interpolation-filters', 'sRGB')
  svg.style.display = 'none'
  svg.innerHTML = `
    <defs>
      <filter id="magnifying-glass-filter">
        <feImage href="${createMapDataUri('magnify')}" x="0" y="0" width="${GLASS_WIDTH}" height="${GLASS_HEIGHT}" result="magnifying_displacement_map" />
        <feDisplacementMap in="SourceGraphic" in2="magnifying_displacement_map" xChannelSelector="R" yChannelSelector="G" result="magnified_source" scale="24" />
        <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source" />
        <feImage href="${createMapDataUri('edge')}" x="0" y="0" width="${GLASS_WIDTH}" height="${GLASS_HEIGHT}" result="displacement_map" />
        <feDisplacementMap in="blurred_source" in2="displacement_map" xChannelSelector="R" yChannelSelector="G" result="displaced" scale="98" />
        <feColorMatrix in="displaced" type="saturate" result="displaced_saturated" values="9" />
        <feImage href="${createMapDataUri('specular')}" x="0" y="0" width="${GLASS_WIDTH}" height="${GLASS_HEIGHT}" result="specular_layer" />
        <feComposite in="displaced_saturated" in2="specular_layer" operator="in" result="specular_saturated" />
        <feComponentTransfer in="specular_layer" result="specular_faded">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation" />
        <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
      </filter>
    </defs>
  `
  return svg
}

export default class LiquidGlassLayerView extends ComponentView {
  static type = 'liquidGlassLayer'
  type = LiquidGlassLayerView.type

  private _host: HTMLDivElement | null = null
  private _widget: HTMLDivElement | null = null
  private _filterSvg: SVGSVGElement | null = null
  private _dragStartX = 0
  private _dragStartY = 0
  private _startLeft = 0
  private _startTop = 0

  render(model: LiquidGlassLayerModel, _piModel: GlobalModel, api: ExtensionAPI): void {
    this._ensureHost(api, model)
    if (!this._host || !this._widget) return

    this._host.style.display = model.get('show') ? 'block' : 'none'
    this._host.style.zIndex = String(model.get('zIndex') || 40)
    this._widget.style.width = `${model.get('width') || GLASS_WIDTH}px`
    this._widget.style.height = `${model.get('height') || GLASS_HEIGHT}px`
    this._widget.style.borderRadius = `${(model.get('height') || GLASS_HEIGHT) / 2}px`
    this._widget.style.left = `${model.get('left') ?? 24}px`
    this._widget.style.top = `${model.get('top') ?? 24}px`

    const lens = createElement<HTMLDivElement>('div', 'liquid-glass-widget__lens')
    const content = createElement<HTMLDivElement>('div', 'liquid-glass-widget__content')
    content.textContent = model.get('title') || ''
    this._widget.replaceChildren(this._filterSvg as SVGSVGElement, lens, content)
  }

  dispose(): void {
    this._host?.remove()
    this._host = null
    this._widget = null
    this._filterSvg = null
  }

  private _ensureHost(api: ExtensionAPI, model: LiquidGlassLayerModel): void {
    if (this._host && this._widget) return

    injectStyle()
    const zr = api.getZr() as any
    const root = zr.dom || zr.painter?.getViewportRoot?.()
    const parent = root?.parentElement || document.body
    if (parent !== document.body && window.getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative'
    }

    this._host = createElement<HTMLDivElement>('div', 'liquid-glass-layer-host')
    this._widget = createElement<HTMLDivElement>('div', 'liquid-glass-widget')
    this._filterSvg = createFilterSvg()
    this._bindDrag(model)
    this._host.appendChild(this._widget)
    parent.appendChild(this._host)
  }

  private _bindDrag(model: LiquidGlassLayerModel): void {
    if (!this._widget) return

    this._widget.onpointerdown = (event: PointerEvent) => {
      if (!this._widget) return

      this._dragStartX = event.clientX
      this._dragStartY = event.clientY
      this._startLeft = parseFloat(this._widget.style.left || `${model.get('left') || 24}`)
      this._startTop = parseFloat(this._widget.style.top || `${model.get('top') || 24}`)
      this._widget.setPointerCapture(event.pointerId)
    }

    this._widget.onpointermove = (event: PointerEvent) => {
      if (!this._widget || !this._widget.hasPointerCapture(event.pointerId)) return

      const nextLeft = this._startLeft + event.clientX - this._dragStartX
      const nextTop = this._startTop + event.clientY - this._dragStartY
      this._widget.style.left = `${Math.max(0, nextLeft)}px`
      this._widget.style.top = `${Math.max(0, nextTop)}px`
    }

    this._widget.onpointerup = (event: PointerEvent) => {
      this._widget?.releasePointerCapture(event.pointerId)
    }

    this._widget.onpointercancel = (event: PointerEvent) => {
      this._widget?.releasePointerCapture(event.pointerId)
    }
  }
}
