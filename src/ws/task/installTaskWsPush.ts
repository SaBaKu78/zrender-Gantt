import WebSocketClient from '../WebSocketClient'
import { installWsHandler, WsRuntime } from '../installWsPush'
import type { WsMessage } from '../types'
import { normalizeWsMessage } from './TaskEventNormalizer'
import type { BackendAckMessage, BackendWsEnvelope, TaskEvent } from './types'

export type TaskWsPushRuntime = WsRuntime

export function installTaskWsPush(
  runtime: WsRuntime,
  onTaskEvent?: (message: TaskEvent) => void
): () => void {
  const disposeHandler = onTaskEvent
    ? installWsHandler(runtime, 'TASK_EVENT', onTaskEvent)
    : () => {}
  const disposeTaskMessage = runtime.client.onMessage((message) => {
    sendAckIfNeeded(runtime.client, message)

    normalizeWsMessage(message).forEach((taskEvent) => {
      runtime.router.dispatch(taskEvent)
    })
  })

  return () => {
    disposeTaskMessage()
    disposeHandler()
  }
}

/**
 * @deprecated Use installTaskWsPush. Kept as a compatibility alias for callers
 * that still use the old name.
 */
export const installTaskWsHandlers = installTaskWsPush

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
