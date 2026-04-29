import { Dictionary } from './types'
import {
  map,
  isString,
  isFunction,
  eqNaN,
  isRegExp,
} from 'zrender/src/core/util'

const GANTT_PREFIX = '[Gantt] '
const storedLogs: Dictionary<boolean> = {}

const hasConsole =
  typeof console !== 'undefined' &&
  // eslint-disable-next-line
  console.warn &&
  console.log

function outputLog(
  type: 'log' | 'warn' | 'error',
  str: string,
  onlyOnce?: boolean
) {
  if (hasConsole) {
    if (onlyOnce) {
      if (storedLogs[str]) {
        return
      }
      storedLogs[str] = true
    }
    // eslint-disable-next-line
    console[type](GANTT_PREFIX + str)
  }
}

export function log(str: string, onlyOnce?: boolean) {
  outputLog('log', str, onlyOnce)
}

export function warn(str: string, onlyOnce?: boolean) {
  outputLog('warn', str, onlyOnce)
}

export function error(str: string, onlyOnce?: boolean) {
  outputLog('error', str, onlyOnce)
}

export function deprecateLog(str: string) {
  if (__DEV__) {
    // Not display duplicate message.
    outputLog('warn', 'DEPRECATED: ' + str, true)
  }
}

export function deprecateReplaceLog(
  oldOpt: string,
  newOpt: string,
  scope?: string
) {
  if (__DEV__) {
    deprecateLog(
      (scope ? `[${scope}]` : '') +
        `${oldOpt} is deprecated, use ${newOpt} instead.`
    )
  }
}

/**
 * If in __DEV__ environment, get console printable message for users hint.
 * Parameters are separated by ' '.
 * @usage
 * makePrintable('This is an error on', someVar, someObj);
 *
 * @param hintInfo anything about the current execution context to hint users.
 * @throws Error
 */
export function makePrintable(...hintInfo: unknown[]): string {
  let msg = ''

  if (__DEV__) {
    // Fuzzy stringify for print.
    // This code only exist in dev environment.
    const makePrintableStringIfPossible = (val: unknown): string => {
      return val === void 0
        ? 'undefined'
        : val === Infinity
        ? 'Infinity'
        : val === -Infinity
        ? '-Infinity'
        : eqNaN(val)
        ? 'NaN'
        : val instanceof Date
        ? 'Date(' + val.toISOString() + ')'
        : isFunction(val)
        ? 'function () { ... }'
        : isRegExp(val)
        ? val + ''
        : null
    }
    msg = map(hintInfo, (arg) => {
      if (isString(arg)) {
        // Print without quotation mark for some statement.
        return arg
      } else {
        const printableStr = makePrintableStringIfPossible(arg)
        if (printableStr != null) {
          return printableStr
        } else if (typeof JSON !== 'undefined' && JSON.stringify) {
          try {
            return JSON.stringify(arg, function (n, val) {
              const printableStr = makePrintableStringIfPossible(val)
              return printableStr == null ? val : printableStr
            })
            // In most cases the info object is small, so do not line break.
          } catch (err) {
            return '?'
          }
        } else {
          return '?'
        }
      }
    }).join(' ')
  }

  return msg
}

/**
 * @throws Error
 */
export function throwError(msg?: string) {
  throw new Error(msg)
}
