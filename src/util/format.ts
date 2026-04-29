import * as zrUtil from 'zrender/src/core/util'
import { isNumeric } from './number';

export const normalizeCssArray = zrUtil.normalizeCssArray


export function addCommas(x: string | number): string {
    if (!isNumeric(x)) {
        return zrUtil.isString(x) ? x : '-';
    }
    const parts = (x + '').split('.');
    return parts[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            + (parts.length > 1 ? ('.' + parts[1]) : '');
}