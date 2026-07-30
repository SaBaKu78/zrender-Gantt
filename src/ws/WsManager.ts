import WebSocketClient from './WebSocketClient'
import { installWsPush, WsRuntime } from './installWsPush'
import type { WsOption } from './types'

export default class WsManager {
  private runtime: WsRuntime | null = null
  private configKey = 'disabled'

  configure(option?: WsOption): void {
    const ws = option || {}
    const enabled = ws.enabled === true && !!ws.url
    const nextKey = enabled
      ? JSON.stringify({
          ...ws,
          heartbeatMessage:
            typeof ws.heartbeatMessage === 'function'
              ? '[function]'
              : ws.heartbeatMessage,
        })
      : 'disabled'

    if (nextKey === this.configKey) return

    this.disposeRuntime()
    this.configKey = nextKey

    if (!enabled) return

    const { enabled: _enabled, url, ...clientOptions } = ws
    const client = new WebSocketClient({
      url: url as string,
      ...clientOptions,
    })
    this.runtime = installWsPush(client)
    client.connect()
  }

  getRuntime(): WsRuntime | null {
    return this.runtime
  }

  dispose(): void {
    this.disposeRuntime()
    this.configKey = 'disabled'
  }

  private disposeRuntime(): void {
    if (!this.runtime) return

    this.runtime.dispose()
    this.runtime.client.close()
    this.runtime = null
  }
}
