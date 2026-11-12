import { getTheme } from '../config/theme'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface ToastOptions {
  type?: ToastType
  title?: string
  duration?: number
}

interface ToastItem {
  type: ToastType
  title: string
  message: string
  duration: number
}

const DEFAULT_DURATION = 5000
function getPalette(type: ToastType) {
  const theme = getTheme()
  switch (type) {
    case 'success':
      return { color: theme.success, background: theme.taskStatus[4].background, icon: '✓' }
    case 'warning':
      return { color: theme.warn, background: theme.taskStatus[9].background, icon: '!' }
    case 'error':
      return { color: theme.danger, background: theme.taskStatus[5].background, icon: '!' }
    default:
      return { color: theme.primary, background: theme.primarySoft, icon: 'i' }
  }
}
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
    fontFamily: '"Microsoft YaHei", sans-serif',
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
  const palette = getPalette(item.type)
  const theme = getTheme()
  isShowing = true

  const toast = document.createElement('section')
  toast.setAttribute('role', item.type === 'error' ? 'alert' : 'status')
  Object.assign(toast.style, {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 14px 14px 16px',
    border: `1px solid ${palette.color}`,
    borderRadius: '6px',
    background: palette.background,
    color: palette.color,
    boxShadow: `0 4px 14px ${theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.34)' : 'rgba(31, 72, 130, 0.16)'}`,
    pointerEvents: 'auto',
    boxSizing: 'border-box',
    marginBottom: '10px',
  })

  const icon = document.createElement('span')
  icon.textContent = palette.icon
  icon.setAttribute('aria-hidden', 'true')
  Object.assign(icon.style, {
    flex: '0 0 24px',
    width: '24px',
    height: '24px',
    border: `2px solid ${palette.color}`,
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
    color: theme.textSecondary,
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
    flex: '0 0 28px',
    width: '28px',
    height: '28px',
    padding: '0',
    border: '0',
    background: 'transparent',
    color: palette.color,
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
    type: options.type || 'info',
    title: options.title || '提示',
    message,
    duration: options.duration ?? DEFAULT_DURATION,
  })
  showNext()
}
