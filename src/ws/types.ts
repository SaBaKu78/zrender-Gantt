export type WsStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'closed'
  | 'error'

export interface WsMessage<TPayload = unknown> {
  type: string
  traceId?: string
  timestamp?: number
  payload?: TPayload
}

export type WsMessageHandler<TMessage extends WsMessage = WsMessage> = (
  message: TMessage
) => void

export type WsStatusHandler = (status: WsStatus, event?: Event) => void

export interface WebSocketClientOptions {
  url: string
  protocols?: string | string[]
  heartbeatInterval?: number
  heartbeatMessage?: string | object | (() => string | object)
  reconnect?: boolean
  reconnectDelay?: number
  maxReconnectDelay?: number
  maxReconnectAttempts?: number
}

export interface WsOption extends Omit<WebSocketClientOptions, 'url'> {
  /**
   * 是否启用任务 WebSocket 推送。默认关闭。
   */
  enabled?: boolean
  /**
   * WebSocket 服务地址。
   */
  url?: string
}
