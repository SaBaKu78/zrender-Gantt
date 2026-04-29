import * as zrUtil from 'zrender/src/core/util'

const RADIAN_EPSILON = 1e-4

const ROUND_SUPPORTED_PRECISION_MAX = 20

function _trim(str: string): string {
  return str.replace(/^\s+|\s+$/g, '')
}

/**
 * Use random base to prevent users hard code depending on
 * this auto generated marker id.
 * @return An positive integer.
 */
export function getRandomIdBase(): number {
  return Math.round(Math.random() * 9)
}

const TIME_REG =
  /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/

export function parseDate(value: unknown): Date {
  if (value instanceof Date) {
    return value
  } else if (zrUtil.isString(value)) {
    // Different browsers parse date in different way, so we parse it manually.
    // Some other issues:
    // new Date('1970-01-01') is UTC,
    // new Date('1970/01/01') and new Date('1970-1-01') is local.
    // See issue #3623
    const match = TIME_REG.exec(value)

    if (!match) {
      // return Invalid Date.
      return new Date(NaN)
    }

    // Use local time when no timezone offset is specified.
    if (!match[8]) {
      // match[n] can only be string or undefined.
      // But take care of '12' + 1 => '121'.
      return new Date(
        +match[1],
        +(match[2] || 1) - 1,
        +match[3] || 1,
        +match[4] || 0,
        +(match[5] || 0),
        +match[6] || 0,
        match[7] ? +match[7].substring(0, 3) : 0
      )
    } else {
      let hour = +match[4] || 0
      if (match[8].toUpperCase() !== 'Z') {
        hour -= +match[8].slice(0, 3)
      }
      return new Date(
        Date.UTC(
          +match[1],
          +(match[2] || 1) - 1,
          +match[3] || 1,
          hour,
          +(match[5] || 0),
          +match[6] || 0,
          match[7] ? +match[7].substring(0, 3) : 0
        )
      )
    }
  } else if (value == null) {
    return new Date(NaN)
  }

  return new Date(Math.round(value as number))
}

/**
 * Get precision.
 */
export function getPrecision(val: string | number): number {
  val = +val
  if (isNaN(val)) {
    return 0
  }

  // It is much faster than methods converting number to string as follows
  //      let tmp = val.toString();
  //      return tmp.length - 1 - tmp.indexOf('.');
  // especially when precision is low
  // Notice:
  // (1) If the loop count is over about 20, it is slower than `getPrecisionSafe`.
  //     (see https://jsbench.me/2vkpcekkvw/1)
  // (2) If the val is less than for example 1e-15, the result may be incorrect.
  //     (see test/ut/spec/util/number.test.ts `getPrecision_equal_random`)
  if (val > 1e-14) {
    let e = 1
    for (let i = 0; i < 15; i++, e *= 10) {
      if (Math.round(val * e) / e === val) {
        return i
      }
    }
  }

  return getPrecisionSafe(val)
}

/**
 * Get precision with slow but safe method
 */
export function getPrecisionSafe(val: string | number): number {
  // toLowerCase for: '3.4E-12'
  const str = val.toString().toLowerCase()

  // Consider scientific notation: '3.4e-12' '3.4e+12'
  const eIndex = str.indexOf('e')
  const exp = eIndex > 0 ? +str.slice(eIndex + 1) : 0
  const significandPartLen = eIndex > 0 ? eIndex : str.length
  const dotIndex = str.indexOf('.')
  const decimalPartLen = dotIndex < 0 ? 0 : significandPartLen - 1 - dotIndex
  return Math.max(0, decimalPartLen - exp)
}

/**
 * Minimal dicernible data precisioin according to a single pixel.
 */
export function getPixelPrecision(
  dataExtent: [number, number],
  pixelExtent: [number, number]
): number {
  const log = Math.log
  const LN10 = Math.LN10
  const dataQuantity = Math.floor(log(dataExtent[1] - dataExtent[0]) / LN10)
  const sizeQuantity = Math.round(
    log(Math.abs(pixelExtent[1] - pixelExtent[0])) / LN10
  )
  // toFixed() digits argument must be between 0 and 20.
  const precision = Math.min(Math.max(-dataQuantity + sizeQuantity, 0), 20)
  return !isFinite(precision) ? 20 : precision
}

/**
 * Linear mapping a value from domain to range 例如 30% 在 [0,200]数据中最后转换出来是60 简化 result = range[0] + (val - domain[0]) * (range[1] - range[0]) / (domain[1] - domain[0])
 * @param  val
 * @param  domain Domain extent domain[0] can be bigger than domain[1]
 * @param  range  Range extent range[0] can be bigger than range[1]
 * @param  clamp Default to be false
 */
export function linearMap(
  val: number,
  domain: number[],
  range: number[],
  clamp?: boolean
): number {
  const d0 = domain[0]
  const d1 = domain[1]
  const r0 = range[0]
  const r1 = range[1]

  const subDomain = d1 - d0
  const subRange = r1 - r0

  if (subDomain === 0) {
    return subRange === 0 ? r0 : (r0 + r1) / 2
  }

  // Avoid accuracy problem in edge, such as
  // 146.39 - 62.83 === 83.55999999999999.
  // See echarts/test/ut/spec/util/number.js#linearMap#accuracyError
  // It is a little verbose for efficiency considering this method
  // is a hotspot.
  if (clamp) {
    if (subDomain > 0) {
      if (val <= d0) {
        return r0
      } else if (val >= d1) {
        return r1
      }
    } else {
      if (val >= d0) {
        return r0
      } else if (val <= d1) {
        return r1
      }
    }
  } else {
    if (val === d0) {
      return r0
    }
    if (val === d1) {
      return r1
    }
  }

  return ((val - d0) / subDomain) * subRange + r0
}

/**
 * 求最大公约数.
 *
 * @param {number} a one number
 * @param {number} b the other number
 */
export function getGreatestCommonDividor(a: number, b: number): number {
  if (b === 0) {
    return a
  }
  return getGreatestCommonDividor(b, a % b)
}

/**
 * 求最小公倍数.
 *
 * @param {number} a one number
 * @param {number} b the other number
 */
export function getLeastCommonMultiple(a: number, b: number) {
  if (a == null) {
    return b
  }
  if (b == null) {
    return a
  }
  return (a * b) / getGreatestCommonDividor(a, b)
}

/**
 * Convert a percent string to absolute number.
 * Returns NaN if percent is not a valid string or number
 */
export function parsePercent(percent: number | string, all: number): number {
  switch (percent) {
    case 'center':
    case 'middle':
      percent = '50%'
      break
    case 'left':
    case 'top':
      percent = '0%'
      break
    case 'right':
    case 'bottom':
      percent = '100%'
      break
  }
  if (zrUtil.isString(percent)) {
    if (_trim(percent).match(/%$/)) {
      return (parseFloat(percent) / 100) * all
    }

    return parseFloat(percent)
  }

  return percent == null ? NaN : +percent
}

/**
 * (1) Fix rounding error of float numbers.
 * (2) Support return string to avoid scientific notation like '3.5e-7'.
 */
export function round(x: number | string, precision?: number): number
export function round(
  x: number | string,
  precision: number,
  returnStr: false
): number
export function round(
  x: number | string,
  precision: number,
  returnStr: true
): string
export function round(
  x: number | string,
  precision?: number,
  returnStr?: boolean
): string | number {
  if (precision == null) {
    precision = 10
  }
  // Avoid range error
  precision = Math.min(Math.max(0, precision), ROUND_SUPPORTED_PRECISION_MAX)
  // PENDING: 1.005.toFixed(2) is '1.00' rather than '1.01'
  x = (+x).toFixed(precision)
  return returnStr ? x : +x
}

export function quantityExponent(val: number): number {
  if (val === 0) {
    return 0
  }

  let exp = Math.floor(Math.log(val) / Math.LN10)
  /**
   * exp is expected to be the rounded-down result of the base-10 log of val.
   * But due to the precision loss with Math.log(val), we need to restore it
   * using 10^exp to make sure we can get val back from exp. #11249
   */
  if (val / Math.pow(10, exp) >= 10) {
    exp++
  }
  return exp
}

export function nice(val: number, round?: boolean): number {
  const exponent = quantityExponent(val)
  const exp10 = Math.pow(10, exponent)
  const f = val / exp10 // 1 <= f < 10
  let nf
  if (round) {
    if (f < 1.5) {
      nf = 1
    } else if (f < 2.5) {
      nf = 2
    } else if (f < 4) {
      nf = 3
    } else if (f < 7) {
      nf = 5
    } else {
      nf = 10
    }
  } else {
    if (f < 1) {
      nf = 1
    } else if (f < 2) {
      nf = 2
    } else if (f < 3) {
      nf = 3
    } else if (f < 5) {
      nf = 5
    } else {
      nf = 10
    }
  }
  val = nf * exp10

  // Fix 3 * 0.1 === 0.30000000000000004 issue (see IEEE 754).
  // 20 is the uppper bound of toFixed.
  return exponent >= -20 ? +val.toFixed(exponent < 0 ? -exponent : 0) : val
}

export function remRadian(radian: number): number {
  const pi2 = Math.PI * 2
  return ((radian % pi2) + pi2) % pi2
}

export function isRadianAroundZero(val: number): boolean {
  return val > -RADIAN_EPSILON && val < RADIAN_EPSILON
}

export function asc<T extends number[]>(arr: T): T {
  arr.sort(function (a, b) {
    return a - b
  })
  return arr
}

export function numericToNumber(val: unknown): number {
  const valFloat = parseFloat(val as string)
  return valFloat == val && // eslint-disable-line eqeqeq
    (valFloat !== 0 || !zrUtil.isString(val) || val.indexOf('x') <= 0) // For case ' 0x0 '.
    ? valFloat
    : NaN
}

/**
 * Definition of "numeric": see `numericToNumber`.
 */
export function isNumeric(val: unknown): val is number {
  return !isNaN(numericToNumber(val))
}

const PRIORITY_PROCESSOR_SERIES_FILTER = 800
const PRIORITY_PROCESSOR_DATASTACK = 900
const PRIORITY_PROCESSOR_FILTER = 1000
const PRIORITY_PROCESSOR_DEFAULT = 2000
const PRIORITY_PROCESSOR_STATISTIC = 5000

const PRIORITY_VISUAL_LAYOUT = 1000
const PRIORITY_VISUAL_PROGRESSIVE_LAYOUT = 1100
const PRIORITY_VISUAL_GLOBAL = 2000
const PRIORITY_VISUAL_CHART = 3000
const PRIORITY_VISUAL_COMPONENT = 4000

const PRIORITY_VISUAL_CHART_DATA_CUSTOM = 4500

const PRIORITY_VISUAL_POST_CHART_LAYOUT = 4600
const PRIORITY_VISUAL_BRUSH = 5000
const PRIORITY_VISUAL_ARIA = 6000
const PRIORITY_VISUAL_DECAL = 7000

export const PRIORITY = {
  PROCESSOR: {
    FILTER: PRIORITY_PROCESSOR_FILTER,
    SERIES_FILTER: PRIORITY_PROCESSOR_SERIES_FILTER,
    STATISTIC: PRIORITY_PROCESSOR_STATISTIC,
  },
  VISUAL: {
    LAYOUT: PRIORITY_VISUAL_LAYOUT,
    PROGRESSIVE_LAYOUT: PRIORITY_VISUAL_PROGRESSIVE_LAYOUT,
    GLOBAL: PRIORITY_VISUAL_GLOBAL,
    CHART: PRIORITY_VISUAL_CHART,
    POST_CHART_LAYOUT: PRIORITY_VISUAL_POST_CHART_LAYOUT,
    COMPONENT: PRIORITY_VISUAL_COMPONENT,
    BRUSH: PRIORITY_VISUAL_BRUSH,
    CHART_ITEM: PRIORITY_VISUAL_CHART_DATA_CUSTOM,
    ARIA: PRIORITY_VISUAL_ARIA,
    DECAL: PRIORITY_VISUAL_DECAL,
  },
}
