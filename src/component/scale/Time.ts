import { filter, isNumber, map } from 'zrender/lib/core/util'
import * as numberUtil from '../../util/number'
import Interval from './Interval'
import { ScaleTick, TimeScaleTick } from '../../util/types'
import {
  dateGetterName,
  dateSetterName,
  format,
  fullLeveledFormatter,
  fullYearGetterName,
  fullYearSetterName,
  getDefaultFormatPrecisionOfInterval,
  getPrimaryTimeUnit,
  getUnitValue,
  hoursGetterName,
  hoursSetterName,
  isPrimaryTimeUnit,
  leveledFormat,
  millisecondsGetterName,
  millisecondsSetterName,
  minutesGetterName,
  minutesSetterName,
  monthGetterName,
  monthSetterName,
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
  ONE_YEAR,
  PrimaryTimeUnit,
  secondsGetterName,
  secondsSetterName,
  TimeUnit,
  timeUnits,
} from '../../util/time'
import { Scale } from './Scale'
import { TimeAxisLabelFormatterOption } from '../../coord/axisCommonTypes'
import Model from '../../model/Model'
import { LocaleOption } from '../../core/locale'

const bisect = function (
  a: [string | number, number][],
  x: number,
  lo: number,
  hi: number
): number {
  while (lo < hi) {
    const mid = (lo + hi) >>> 1
    if (a[mid][1] < x) {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  return lo
}

type TimeScaleSetting = {
  locale: Model<LocaleOption>
  useUTC: boolean
}

class TimeScale extends Interval<TimeScaleSetting> {
  static type = 'time'
  readonly type = 'time'

  _approxInterval: number

  _minLevelUnit: TimeUnit

  constructor(settings?: TimeScaleSetting) {
    super(settings)
  }

  parse(val: number | string | Date): number {
    // val might be float.
    return isNumber(val) ? val : +numberUtil.parseDate(val)
  }

  getTicks(): ScaleTick[] {
    const interval = this._interval
    const extent = this._extent
    let ticks = [] as TimeScaleTick[]
    // If interval is 0, return [];
    if (!interval) {
      return ticks
    }

    ticks.push({
      value: extent[0],
      level: 0,
    })

    const useUTC = this.getSetting('useUTC')

    const innerTicks = getIntervalTicks(
      this._minLevelUnit,
      this._approxInterval,
      useUTC,
      extent
    )

    ticks = ticks.concat(innerTicks)

    ticks.push({
      value: extent[1],
      level: 0,
    })

    return ticks
  }

  getLabel(tick: TimeScaleTick): string {
    const useUTC = this.getSetting('useUTC')
    return format(
      tick.value,
      fullLeveledFormatter[
        getDefaultFormatPrecisionOfInterval(
          getPrimaryTimeUnit(this._minLevelUnit)
        )
      ] || fullLeveledFormatter.second,
      useUTC,
      this.getSetting('locale')
    )
  }

  getFormattedLabel(
    tick: TimeScaleTick,
    idx: number,
    labelFormatter: TimeAxisLabelFormatterOption
  ): string {
    const isUTC = this.getSetting('useUTC')
    const lang = this.getSetting('locale')
    return leveledFormat(tick, idx, labelFormatter, lang, isUTC)
  }

  calcNiceExtent(opt?: {
    splitNumber?: number
    fixMin?: boolean
    fixMax?: boolean
    minInterval?: number
    maxInterval?: number
  }): void {
    const extent = this._extent

    if (extent[0] === extent[1]) {
      extent[0] -= ONE_DAY
      extent[1] += ONE_DAY
    }
    if (extent[1] === -Infinity && extent[0] === Infinity) {
      const d = new Date()
      extent[1] = +new Date(d.getFullYear(), d.getMonth(), d.getDate())
      extent[0] = extent[1] - ONE_DAY
    }
    this.calcNiceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval)
  }

  calcNiceTicks(
    approxTickNum: number,
    minInterval: number,
    maxInterval: number
  ): void {
    approxTickNum = approxTickNum || 10

    const extent = this._extent
    const span = extent[1] - extent[0]
    this._approxInterval = span / approxTickNum

    if (minInterval != null && this._approxInterval < minInterval) {
      this._approxInterval = minInterval
    }
    if (maxInterval != null && this._approxInterval > maxInterval) {
      this._approxInterval = maxInterval
    }

    const scaleIntervalsLen = scaleIntervals.length
    const idx = Math.min(
      bisect(scaleIntervals, this._approxInterval, 0, scaleIntervalsLen),
      scaleIntervalsLen - 1
    )
    // Interval that can be used to calculate ticks
    this._interval = scaleIntervals[idx][1]
    // Min level used when picking ticks from top down.
    // We check one more level to avoid the ticks are to sparse in some case.
    this._minLevelUnit = scaleIntervals[Math.max(idx - 1, 0)][0]
  }
}

const scaleIntervals: [TimeUnit, number][] = [
  // Format                           interval
  ['second', ONE_SECOND], // 1s
  ['minute', ONE_MINUTE], // 1m
  ['hour', ONE_HOUR], // 1h
  ['quarter-day', ONE_HOUR * 6], // 6h
  ['half-day', ONE_HOUR * 12], // 12h
  ['day', ONE_DAY * 1.2], // 1d
  ['half-week', ONE_DAY * 3.5], // 3.5d
  ['week', ONE_DAY * 7], // 7d
  ['month', ONE_DAY * 31], // 1M
  ['quarter', ONE_DAY * 95], // 3M
  ['half-year', ONE_YEAR / 2], // 6M
  ['year', ONE_YEAR], // 1Y
]

function isUnitValueSame(
  unit: PrimaryTimeUnit,
  valueA: number,
  valueB: number,
  isUTC: boolean
): boolean {
  const dateA = numberUtil.parseDate(valueA) as any
  const dateB = numberUtil.parseDate(valueB) as any

  const isSame = (unit: PrimaryTimeUnit) => {
    return getUnitValue(dateA, unit, isUTC) === getUnitValue(dateB, unit, isUTC)
  }
  const isSameYear = () => isSame('year')
  // const isSameHalfYear = () => isSameYear() && isSame('half-year');
  // const isSameQuater = () => isSameYear() && isSame('quarter');
  const isSameMonth = () => isSameYear() && isSame('month')
  const isSameDay = () => isSameMonth() && isSame('day')
  // const isSameHalfDay = () => isSameDay() && isSame('half-day');
  const isSameHour = () => isSameDay() && isSame('hour')
  const isSameMinute = () => isSameHour() && isSame('minute')
  const isSameSecond = () => isSameMinute() && isSame('second')
  const isSameMilliSecond = () => isSameSecond() && isSame('millisecond')

  switch (unit) {
    case 'year':
      return isSameYear()
    case 'month':
      return isSameMonth()
    case 'day':
      return isSameDay()
    case 'hour':
      return isSameHour()
    case 'minute':
      return isSameMinute()
    case 'second':
      return isSameSecond()
    case 'millisecond':
      return isSameMilliSecond()
  }
}

function getDateInterval(approxInterval: number, daysInMonth: number) {
  approxInterval /= ONE_DAY
  return approxInterval > 16
    ? 16
    : // Math.floor(daysInMonth / 2) + 1  // In this case we only want one tick between two months.
    approxInterval > 7.5
    ? 7 // TODO week 7 or day 8?
    : approxInterval > 3.5
    ? 4
    : approxInterval > 1.5
    ? 2
    : 1
}

function getMonthInterval(approxInterval: number) {
  const APPROX_ONE_MONTH = 30 * ONE_DAY
  approxInterval /= APPROX_ONE_MONTH
  return approxInterval > 6
    ? 6
    : approxInterval > 3
    ? 3
    : approxInterval > 2
    ? 2
    : 1
}

function getHourInterval(approxInterval: number) {
  approxInterval /= ONE_HOUR
  return approxInterval > 12
    ? 12
    : approxInterval > 6
    ? 6
    : approxInterval > 3.5
    ? 4
    : approxInterval > 2
    ? 2
    : 1
}

function getMinutesAndSecondsInterval(
  approxInterval: number,
  isMinutes?: boolean
) {
  approxInterval /= isMinutes ? ONE_MINUTE : ONE_SECOND
  return approxInterval > 30
    ? 30
    : approxInterval > 20
    ? 20
    : approxInterval > 15
    ? 15
    : approxInterval > 10
    ? 10
    : approxInterval > 5
    ? 5
    : approxInterval > 2
    ? 2
    : 1
}

function getMillisecondsInterval(approxInterval: number) {
  return numberUtil.nice(approxInterval, true)
}

function getFirstTimestampOfUnit(
  date: Date,
  unitName: TimeUnit,
  isUTC: boolean
) {
  const outDate = new Date(date)
  switch (getPrimaryTimeUnit(unitName)) {
    case 'year':
    case 'month':
      outDate[monthSetterName(isUTC)](0)
    case 'day':
      outDate[dateSetterName(isUTC)](1)
    case 'hour':
      outDate[hoursSetterName(isUTC)](0)
    case 'minute':
      outDate[minutesSetterName(isUTC)](0)
    case 'second':
      outDate[secondsSetterName(isUTC)](0)
      outDate[millisecondsSetterName(isUTC)](0)
  }
  return outDate.getTime()
}

function getIntervalTicks(
  bottomUnitName: TimeUnit,
  approxInterval: number,
  isUTC: boolean,
  extent: number[]
): TimeScaleTick[] {
  const safeLimit = 10000
  const unitNames = timeUnits
  // const bottomPrimaryUnitName = getPrimaryTimeUnit(bottomUnitName);

  interface InnerTimeTick extends TimeScaleTick {
    notAdd?: boolean
  }

  let iter = 0

  function addTicksInSpan(
    interval: number,
    minTimestamp: number,
    maxTimestamp: number,
    getMethodName: string,
    setMethodName: string,
    isDate: boolean,
    out: InnerTimeTick[]
  ) {
    const date = new Date(minTimestamp) as any
    let dateTime = minTimestamp
    let d = date[getMethodName]()

    // if (isDate) {
    //     d -= 1; // Starts with 0;   PENDING
    // }

    while (dateTime < maxTimestamp && dateTime <= extent[1]) {
      out.push({
        value: dateTime,
      })

      d += interval
      date[setMethodName](d)
      dateTime = date.getTime()
    }

    // This extra tick is for calcuating ticks of next level. Will not been added to the final result
    out.push({
      value: dateTime,
      notAdd: true,
    })
  }

  function addLevelTicks(
    unitName: TimeUnit,
    lastLevelTicks: InnerTimeTick[],
    levelTicks: InnerTimeTick[]
  ) {
    const newAddedTicks: ScaleTick[] = []
    const isFirstLevel = !lastLevelTicks.length

    if (
      isUnitValueSame(getPrimaryTimeUnit(unitName), extent[0], extent[1], isUTC)
    ) {
      return
    }

    if (isFirstLevel) {
      lastLevelTicks = [
        {
          // TODO Optimize. Not include so may ticks.
          value: getFirstTimestampOfUnit(new Date(extent[0]), unitName, isUTC),
        },
        {
          value: extent[1],
        },
      ]
    }

    for (let i = 0; i < lastLevelTicks.length - 1; i++) {
      const startTick = lastLevelTicks[i].value
      const endTick = lastLevelTicks[i + 1].value
      if (startTick === endTick) {
        continue
      }

      let interval: number
      let getterName
      let setterName
      let isDate = false

      switch (unitName) {
        case 'year':
          interval = Math.max(1, Math.round(approxInterval / ONE_DAY / 365))
          getterName = fullYearGetterName(isUTC)
          setterName = fullYearSetterName(isUTC)
          break
        case 'half-year':
        case 'quarter':
        case 'month':
          interval = getMonthInterval(approxInterval)
          getterName = monthGetterName(isUTC)
          setterName = monthSetterName(isUTC)
          break
        case 'week': // PENDING If week is added. Ignore day.
        case 'half-week':
        case 'day':
          interval = getDateInterval(approxInterval, 31) // Use 32 days and let interval been 16
          getterName = dateGetterName(isUTC)
          setterName = dateSetterName(isUTC)
          isDate = true
          break
        case 'half-day':
        case 'quarter-day':
        case 'hour':
          interval = getHourInterval(approxInterval)
          getterName = hoursGetterName(isUTC)
          setterName = hoursSetterName(isUTC)
          break
        case 'minute':
          interval = getMinutesAndSecondsInterval(approxInterval, true)
          getterName = minutesGetterName(isUTC)
          setterName = minutesSetterName(isUTC)
          break
        case 'second':
          interval = getMinutesAndSecondsInterval(approxInterval, false)
          getterName = secondsGetterName(isUTC)
          setterName = secondsSetterName(isUTC)
          break
        case 'millisecond':
          interval = getMillisecondsInterval(approxInterval)
          getterName = millisecondsGetterName(isUTC)
          setterName = millisecondsSetterName(isUTC)
          break
      }

      addTicksInSpan(
        interval,
        startTick,
        endTick,
        getterName,
        setterName,
        isDate,
        newAddedTicks
      )

      if (unitName === 'year' && levelTicks.length > 1 && i === 0) {
        // Add nearest years to the left extent.
        levelTicks.unshift({
          value: levelTicks[0].value - interval,
        })
      }
    }

    for (let i = 0; i < newAddedTicks.length; i++) {
      levelTicks.push(newAddedTicks[i])
    }
    // newAddedTicks.length && console.log(unitName, newAddedTicks);
    return newAddedTicks
  }

  const levelsTicks: InnerTimeTick[][] = []
  let currentLevelTicks: InnerTimeTick[] = []

  let tickCount = 0
  let lastLevelTickCount = 0
  for (let i = 0; i < unitNames.length && iter++ < safeLimit; ++i) {
    const primaryTimeUnit = getPrimaryTimeUnit(unitNames[i])
    if (!isPrimaryTimeUnit(unitNames[i])) {
      // TODO
      continue
    }
    addLevelTicks(
      unitNames[i],
      levelsTicks[levelsTicks.length - 1] || [],
      currentLevelTicks
    )

    const nextPrimaryTimeUnit: PrimaryTimeUnit = unitNames[i + 1]
      ? getPrimaryTimeUnit(unitNames[i + 1])
      : null
    if (primaryTimeUnit !== nextPrimaryTimeUnit) {
      if (currentLevelTicks.length) {
        lastLevelTickCount = tickCount
        // Remove the duplicate so the tick count can be precisely.
        currentLevelTicks.sort((a, b) => a.value - b.value)
        const levelTicksRemoveDuplicated = []
        for (let i = 0; i < currentLevelTicks.length; ++i) {
          const tickValue = currentLevelTicks[i].value
          if (i === 0 || currentLevelTicks[i - 1].value !== tickValue) {
            levelTicksRemoveDuplicated.push(currentLevelTicks[i])
            if (tickValue >= extent[0] && tickValue <= extent[1]) {
              tickCount++
            }
          }
        }

        const targetTickNum = (extent[1] - extent[0]) / approxInterval
        // Added too much in this level and not too less in last level
        if (
          tickCount > targetTickNum * 1.5 &&
          lastLevelTickCount > targetTickNum / 1.5
        ) {
          break
        }

        // Only treat primary time unit as one level.
        levelsTicks.push(levelTicksRemoveDuplicated)

        if (tickCount > targetTickNum || bottomUnitName === unitNames[i]) {
          break
        }
      }
      // Reset if next unitName is primary
      currentLevelTicks = []
    }
  }

  const levelsTicksInExtent = filter(
    map(levelsTicks, (levelTicks) => {
      return filter(
        levelTicks,
        (tick) =>
          tick.value >= extent[0] && tick.value <= extent[1] && !tick.notAdd
      )
    }),
    (levelTicks) => levelTicks.length > 0
  )

  const ticks: TimeScaleTick[] = []
  const maxLevel = levelsTicksInExtent.length - 1
  for (let i = 0; i < levelsTicksInExtent.length; ++i) {
    const levelTicks = levelsTicksInExtent[i]
    for (let k = 0; k < levelTicks.length; ++k) {
      ticks.push({
        value: levelTicks[k].value,
        level: maxLevel - i,
      })
    }
  }

  ticks.sort((a, b) => a.value - b.value)
  // Remove duplicates
  const result: TimeScaleTick[] = []
  for (let i = 0; i < ticks.length; ++i) {
    if (i === 0 || ticks[i].value !== ticks[i - 1].value) {
      result.push(ticks[i])
    }
  }

  return result
}

Scale.registerClass(TimeScale)

export default TimeScale
