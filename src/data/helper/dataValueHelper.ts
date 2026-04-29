import { isNumber } from 'zrender/src/core/util'
import { DimensionType, ParsedValue } from '../../util/types'
import { parseDate } from '../../util/number'

export function parseDataValue(
  value: any,
  // For high performance, do not omit the second param.
  opt: {
    // Default type: 'number'. There is no 'unknown' type. That is, a string
    // will be parsed to NaN if do not set `type` as 'ordinal'. It has been
    // the logic in `List.ts` for long time. Follow the same way if you need
    // to get same result as List did from a raw value.
    type?: DimensionType
  }
): ParsedValue {
  // Performance sensitive.
  const dimType = opt && opt.type
  if (dimType === 'ordinal') {
    // If given value is a category string
    return value
  }

  if (
    dimType === 'time' &&
    // spead up when using timestamp
    !isNumber(value) &&
    value != null &&
    value !== '-'
  ) {
    value = +parseDate(value)
  }

  // dimType defaults 'number'.
  // If dimType is not ordinal and value is null or undefined or NaN or '-',
  // parse to NaN.
  // number-like string (like ' 123 ') can be converted to a number.
  // where null/undefined or other string will be converted to NaN.
  return value == null || value === ''
    ? NaN
    : // If string (like '-'), using '+' parse to NaN
      // If object, also parse to NaN
      +value
}
