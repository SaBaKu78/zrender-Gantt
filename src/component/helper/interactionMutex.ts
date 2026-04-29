import * as gantt from '../../core/Gantt'
import { noop } from 'zrender/src/core/util'

const ATTR = '\0_pi_interaction_mutex'

export function take(zr, resourceKey, userKey) {
  const store = getStore(zr)
  store[resourceKey] = userKey
}

export function release(zr, resourceKey, userKey) {
  const store = getStore(zr)
  const uKey = store[resourceKey]

  if (uKey === userKey) {
    store[resourceKey] = null
  }
}

export function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey]
}

function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {})
}

/**
 * payload: {
 *     type: 'takeGlobalCursor',
 *     key: 'dataZoomSelect', or 'brush', or ...,
 *         If no userKey, release global cursor.
 * }
 */
// TODO: SELF REGISTERED.
// gantt.registerAction(
//   { type: 'takeGlobalCursor', event: 'globalCursorTaken', update: 'update' },
//   noop
// )
