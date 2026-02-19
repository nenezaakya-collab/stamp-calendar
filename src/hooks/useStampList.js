import { useState, useEffect } from 'react'
import { DEFAULT_STAMPS } from '../constants/defaultStamps'

const STORAGE_KEY = 'stamp-calendar-stamps'

/**
 * スタンプリストの状態管理と localStorage 永続化をまとめたフック。
 * @returns {[Array, Function]} [stampList, setStampList]
 */
export function useStampList() {
  const [stampList, setStampList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_STAMPS
    } catch {
      return DEFAULT_STAMPS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stampList))
  }, [stampList])

  return [stampList, setStampList]
}
