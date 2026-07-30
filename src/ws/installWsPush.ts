import WebSocketClient from './WebSocketClient'
import WsMessageRouter from './WsMessageRouter'
import type { WsMessage } from './types'

export interface WsRuntime {
  client: WebSocketClient
  router: WsMessageRouter
  dispose: () => void
}

export function installWsHandler<TMessage extends WsMessage = WsMessage>(
  runtime: WsRuntime,
  type: string,
  handler: (message: TMessage) => void
): () => void {
  return runtime.router.register(type, handler)
}

/**
 * 通用 WS 接收层。所有业务域消息都先经过这里，再由各业务模块注册处理器。
 */
export function installWsPush(client: WebSocketClient): WsRuntime {
  const router = new WsMessageRouter()
  const disposeMessage = client.onMessage((message: WsMessage) => {
    router.dispatch(message)
  })

  return {
    client,
    router,
    dispose: () => {
      disposeMessage()
      router.clear()
    },
  }
}
