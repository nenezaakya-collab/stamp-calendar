import { useState, useEffect } from 'react'
import { getDayKey } from '../utils/date'

const STORAGE_KEY = 'stamp-calendar-data'

/**
 * カレンダーデータの状態管理と localStorage 永続化をまとめたフック。
 * @returns {{ calendarData: object, updateDay: function }}
 */
export function useCalendarData() {
  const [calendarData, setCalendarData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calendarData))
  }, [calendarData])

  /** 指定した日のスタンプとメモを更新する */
  const updateDay = (date, stamps, memo) => {
    const key = getDayKey(date)
    setCalendarData(prev => ({ ...prev, [key]: { stamps, memo } }))
  }

  return { calendarData, updateDay }
}
