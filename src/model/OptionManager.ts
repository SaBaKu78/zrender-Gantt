import { clone } from 'zrender/src/core/util'
import { GanttBaseOption, GanttUnitOption } from '../util/types'

interface ParsedRawOption {
  baseOption: GanttUnitOption
}

class OptionManager {
  private _optionBackup: ParsedRawOption

  private _newBaseOption: GanttUnitOption

  /**
   * 对外部参数进行格式化，适合内部使用
   * @param rawOption 原始参数
   */
  setOption(rawOption: GanttBaseOption): void {
    rawOption = clone(rawOption)
    const optionBackup = this._optionBackup
    const newParsedOption = parseRawOption(rawOption, !optionBackup)
    this._newBaseOption = newParsedOption.baseOption
    if (!optionBackup) {
      this._optionBackup = newParsedOption
    }
  }

  mountOption(isRecreate: boolean): GanttUnitOption {
    const optionBackup = this._optionBackup
    return clone(isRecreate ? optionBackup.baseOption : this._newBaseOption)
  }
}

function parseRawOption(
  rawOption: GanttBaseOption,
  isNew?: boolean
): ParsedRawOption {
  let baseOption: GanttUnitOption

  const declaredBaseOption = rawOption.baseOption

  if (declaredBaseOption) {
    baseOption = declaredBaseOption
  } else {
    baseOption = rawOption
  }

  return {
    baseOption: baseOption,
  }
}

export default OptionManager
