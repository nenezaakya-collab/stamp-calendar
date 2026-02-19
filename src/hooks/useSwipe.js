import { useRef } from 'react'

/**
 * 左右スワイプを検出するフック。
 * @param {{ onSwipeLeft: Function, onSwipeRight: Function, threshold?: number }}
 * @returns {{ handleTouchStart: Function, handleTouchEnd: Function }}
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }) {
  const touchStartX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) onSwipeLeft()
      else onSwipeRight()
    }
    touchStartX.current = null
  }

  return { handleTouchStart, handleTouchEnd }
}
