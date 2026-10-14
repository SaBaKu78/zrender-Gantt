export interface ToastOptions {
  title?: string
  duration?: number
}

interface ToastItem {
  title: string
  message: string
  duration: number
}

const DEFAULT_DURATION = 5000
const queue: ToastItem[] = []
let container: HTMLDivElement | null = null
let activeTimer: ReturnType<typeof setTimeout> | null = null
let isShowing = false

function ensureContainer(): HTMLDivElement | null {
  if (typeof document === 'undefined') return null
  if (container?.isConnected) return container

  container = document.createElement('div')
  container.setAttribute('aria-live', 'polite')
  container.setAttribute('aria-relevant', 'additions text')
  Object.assign(container.style, {
    position: 'fixed',
    top: '24px',
    right: '24px',
    zIndex: '2147483647',
    width: 'min(360px, calc(100vw - 32px))',
    pointerEvents: 'none',
    fontFamily: 'Arial, sans-serif',
  })
  document.body.appendChild(container)
  return container
}

function advanceQueue(): void {
  if (activeTimer) {
    clearTimeout(activeTimer)
    activeTimer = null
  }
  isShowing = false
  if (container) container.replaceChildren()
  showNext()
}

function showNext(): void {
  if (isShowing || !queue.length) return
  const host = ensureContainer()
  if (!host) return

  const item = queue.shift()!
  isShowing = true

  const toast = document.createElement('section')
  toast.setAttribute('role', 'status')
  Object.assign(toast.style, {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 14px 14px 16px',
    borderLeft: '5px solid #3B82F6',
    borderRadius: '6px',
    background: '#E8F1FF',
    color: '#3B82F6',
    boxShadow: '0 4px 14px rgba(31, 72, 130, 0.16)',
    pointerEvents: 'auto',
    boxSizing: 'border-box',
    marginBottom: '10px',
  })

  const icon = document.createElement('span')
  icon.textContent = 'i'
  Object.assign(icon.style, {
    flex: '0 0 24px',
    width: '24px',
    height: '24px',
    border: '2px solid #3B82F6',
    borderRadius: '50%',
    boxSizing: 'border-box',
    textAlign: 'center',
    lineHeight: '20px',
    fontWeight: '700',
    fontSize: '15px',
  })

  const content = document.createElement('div')
  Object.assign(content.style, { flex: '1 1 auto', minWidth: '0' })

  const title = document.createElement('div')
  title.textContent = item.title
  Object.assign(title.style, { fontWeight: '700', fontSize: '14px', lineHeight: '20px' })

  const message = document.createElement('div')
  message.textContent = item.message
  Object.assign(message.style, {
    marginTop: '3px',
    color: '#5485CE',
    fontSize: '13px',
    lineHeight: '19px',
    overflowWrap: 'anywhere',
  })

  const close = document.createElement('button')
  close.type = 'button'
  close.setAttribute('aria-label', '关闭提示')
  close.title = '关闭提示'
  close.textContent = '×'
  Object.assign(close.style, {
    flex: '0 0 20px',
    width: '20px',
    height: '20px',
    padding: '0',
    border: '0',
    background: 'transparent',
    color: '#5485CE',
    fontSize: '20px',
    lineHeight: '18px',
    cursor: 'pointer',
  })
  close.addEventListener('click', advanceQueue, { once: true })

  content.append(title, message)
  toast.append(icon, content, close)
  host.replaceChildren(toast)

  if (item.duration > 0) {
    activeTimer = setTimeout(advanceQueue, item.duration)
  }
}

export function showToast(message: string, options: ToastOptions = {}): void {
  queue.push({
    title: options.title || '提示',
    message,
    duration: options.duration ?? DEFAULT_DURATION,
  })
  showNext()
}
