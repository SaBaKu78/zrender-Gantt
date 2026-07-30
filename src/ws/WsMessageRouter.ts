import type { WsMessage, WsMessageHandler } from './types'

type AnyHandler = WsMessageHandler<WsMessage>

export default class WsMessageRouter {
  private handlers = new Map<string, Set<AnyHandler>>()

  private wildcardHandlers = new Set<AnyHandler>()

  register<TMessage extends WsMessage = WsMessage>(
    type: string,
    handler: WsMessageHandler<TMessage>
  ): () => void {
    const handlerSet = this.handlers.get(type) || new Set<AnyHandler>()
    handlerSet.add(handler as AnyHandler)
    this.handlers.set(type, handlerSet)

    return () => {
      handlerSet.delete(handler as AnyHandler)
      if (!handlerSet.size) {
        this.handlers.delete(type)
      }
    }
  }

  registerAll(handler: AnyHandler): () => void {
    this.wildcardHandlers.add(handler)

    return () => {
      this.wildcardHandlers.delete(handler)
    }
  }

  dispatch(message: WsMessage): void {
    if (!message?.type) return

    this.handlers.get(message.type)?.forEach((handler) => {
      handler(message)
    })

    this.wildcardHandlers.forEach((handler) => {
      handler(message)
    })
  }

  clear(): void {
    this.handlers.clear()
    this.wildcardHandlers.clear()
  }
}

