import WebSocketClient from '../WebSocketClient'
import { installWsPush, WsRuntime } from '../installWsPush'
import type { WsMessage } from '../types'
import { normalizeWsMessage } from './TaskEventNormalizer'
import type { BackendAckMessage, BackendWsEnvelope } from './types'

export type TaskWsPushRuntime = WsRuntime

export function installTaskWsPush(client: WebSocketClient): TaskWsPushRuntime {
  const runtime = installWsPush(client)
  installTaskWsHandlers(runtime)

  return runtime
}

export function installTaskWsHandlers(runtime: WsRuntime): () => void {
  const disposeTaskMessage = runtime.client.onMessage((message) => {
    sendAckIfNeeded(runtime.client, message)

    normalizeWsMessage(message).forEach((taskEvent) => {
      runtime.router.dispatch(taskEvent)
    })
  })

  return () => {
    disposeTaskMessage()
  }
}

function sendAckIfNeeded(client: WebSocketClient, message: WsMessage): void {
  const envelope = message as BackendWsEnvelope
  if (!envelope.needAck || envelope.messageId == null) {
    return
  }

  const ack: BackendAckMessage = {
    type: 'ack',
    messageId: envelope.messageId,
  }
  client.send(ack)
}
