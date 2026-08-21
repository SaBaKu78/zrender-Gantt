import WebSocketClient from './WebSocketClient'
import WsMessageRouter from './WsMessageRouter'
import type { WsMessage, WsMessageHandler } from './types'

export interface WsRuntime {
  client: WebSocketClient
  router: WsMessageRouter
  on: <TMessage extends WsMessage = WsMessage>(
    type: string,
    handler: WsMessageHandler<TMessage>
  ) => () => void
  dispose: () => void
}

export function installWsHandler<TMessage extends WsMessage = WsMessage>(
  runtime: WsRuntime,
  type: string,
  handler: (message: TMessage) => void
): () => void {
  return runtime.on(type, handler)
}

/**
 * 创建通用 WS 运行时。
 *
 * 原始消息的接收和标准化由具体业务域负责，避免通用层和业务层
 * 同时监听同一个 WebSocket 消息并重复派发。
 */
export function installWsPush(client: WebSocketClient): WsRuntime {
  const router = new WsMessageRouter()

  return {
    client,
    router,
    on: (type, handler) => router.register(type, handler),
    dispose: () => {
      router.clear()
    },
  }
}
