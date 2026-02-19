import { useMemo } from 'react'
import HolidayJP from 'holiday-jp'
import { toJSTKey } from '../utils/date'

/**
 * 指定した年月の祝日マップを返すフック。
 * @param {number} year
 * @param {number} month - 0始まり
 * @returns {Object} { 'YYYY-MM-DD': '祝日名' }
 */
export function useHolidayMap(year, month) {
  return useMemo(() => {
    const map = {}
    try {
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      HolidayJP.between(firstDay, lastDay).forEach(h => {
        map[toJSTKey(h.date)] = h.name
      })
    } catch {
      // holiday-jp がカバーしない年は空のまま
    }
    return map
  }, [year, month])
}
