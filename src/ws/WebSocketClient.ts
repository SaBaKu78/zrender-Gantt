import type {
  WebSocketClientOptions,
  WsMessage,
  WsMessageHandler,
  WsStatus,
  WsStatusHandler,
} from './types'

const DEFAULT_RECONNECT_DELAY = 1000
const DEFAULT_MAX_RECONNECT_DELAY = 10000
const DEFAULT_HEARTBEAT_INTERVAL = 30000

export default class WebSocketClient {
  private options: WebSocketClientOptions

  private socket: WebSocket | null = null

  private status: WsStatus = 'idle'

  private reconnectAttempts = 0

  private reconnectTimer: number | null = null

  private heartbeatTimer: number | null = null

  private manuallyClosed = false

  private messageHandlers = new Set<WsMessageHandler>()

  private rawMessageHandlers = new Set<(data: MessageEvent['data']) => void>()

  private statusHandlers = new Set<WsStatusHandler>()

  constructor(options: WebSocketClientOptions) {
    this.options = {
      reconnect: true,
      reconnectDelay: DEFAULT_RECONNECT_DELAY,
      maxReconnectDelay: DEFAULT_MAX_RECONNECT_DELAY,
      heartbeatInterval: DEFAULT_HEARTBEAT_INTERVAL,
      ...options,
    }
  }

  connect(): void {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return
    }

    this.manuallyClosed = false
    this.clearReconnectTimer()
    this.setStatus(this.reconnectAttempts ? 'reconnecting' : 'connecting')

    const socket = new WebSocket(this.options.url, this.options.protocols)
    this.socket = socket

    socket.onopen = (event) => {
      this.reconnectAttempts = 0
      this.setStatus('connected', event)
      this.startHeartbeat()
    }

    socket.onmessage = (event) => {
      this.rawMessageHandlers.forEach((handler) => handler(event.data))

      const message = this.parseMessage(event.data)
      if (!message) return

      this.messageHandlers.forEach((handler) => {
        handler(message)
      })
    }

    socket.onerror = (event) => {
      this.setStatus('error', event)
    }

    socket.onclose = (event) => {
      this.stopHeartbeat()
      this.socket = null

      if (this.manuallyClosed) {
        this.setStatus('closed', event)
        return
      }

      if (this.shouldReconnect()) {
        this.scheduleReconnect()
      } else {
        this.setStatus('closed', event)
      }
    }
  }

  close(): void {
    this.manuallyClosed = true
    this.clearReconnectTimer()
    this.stopHeartbeat()
    this.socket?.close()
    this.socket = null
    this.setStatus('closed')
  }

  send(data: unknown): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return
    }

    this.socket.send(typeof data === 'string' ? data : JSON.stringify(data))
  }

  getStatus(): WsStatus {
    return this.status
  }

  onMessage(handler: WsMessageHandler): () => void {
    this.messageHandlers.add(handler)

    return () => {
      this.messageHandlers.delete(handler)
    }
  }

  onRawMessage(handler: (data: MessageEvent['data']) => void): () => void {
    this.rawMessageHandlers.add(handler)

    return () => {
      this.rawMessageHandlers.delete(handler)
    }
  }

  onStatusChange(handler: WsStatusHandler): () => void {
    this.statusHandlers.add(handler)

    return () => {
      this.statusHandlers.delete(handler)
    }
  }

  private parseMessage(data: MessageEvent['data']): WsMessage | null {
    if (typeof data !== 'string') {
      return null
    }

    try {
      const parsed = JSON.parse(data)
      return parsed?.type ? parsed : null
    } catch (_error) {
      return null
    }
  }

  private setStatus(status: WsStatus, event?: Event): void {
    if (this.status === status) return

    this.status = status
    this.statusHandlers.forEach((handler) => {
      handler(status, event)
    })
  }

  private startHeartbeat(): void {
    this.stopHeartbeat()

    if (!this.options.heartbeatMessage) return

    this.heartbeatTimer = window.setInterval(() => {
      const heartbeat =
        typeof this.options.heartbeatMessage === 'function'
          ? this.options.heartbeatMessage()
          : this.options.heartbeatMessage
      this.send(heartbeat)
    }, this.options.heartbeatInterval)
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer == null) return

    window.clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = null
  }

  private shouldReconnect(): boolean {
    if (!this.options.reconnect) return false

    const maxAttempts = this.options.maxReconnectAttempts
    return maxAttempts == null || this.reconnectAttempts < maxAttempts
  }

  private scheduleReconnect(): void {
    this.reconnectAttempts += 1
    this.setStatus('reconnecting')

    const delay = Math.min(
      (this.options.reconnectDelay || DEFAULT_RECONNECT_DELAY) *
        this.reconnectAttempts,
      this.options.maxReconnectDelay || DEFAULT_MAX_RECONNECT_DELAY
    )

    this.reconnectTimer = window.setTimeout(() => {
      this.connect()
    }, delay)
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer == null) return

    window.clearTimeout(this.reconnectTimer)
    this.reconnectTimer = null
  }
}

