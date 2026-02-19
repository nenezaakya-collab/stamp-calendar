import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { getDayKey } from '../utils/date'
import { useHolidayMap } from '../hooks/useHolidayMap'
import { useSwipe } from '../hooks/useSwipe'
import CalendarCell from './CalendarCell'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']
const MONTH_NAMES = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']

export default function Calendar({ currentDate, calendarData, onDayClick, onPrevMonth, onNextMonth }) {
  const { theme } = useTheme()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const todayKey = getDayKey(new Date())
  const holidayMap = useHolidayMap(year, month)
  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: onNextMonth,
    onSwipeRight: onPrevMonth,
  })

  const startDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div
      className="rounded-3xl p-3 sm:p-6 transition-colors duration-300"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ backgroundColor: theme.cardBg, boxShadow: theme.cardShadow }}
    >
      {/* 月ナビゲーション */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={onPrevMonth}
          className="w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-90"
          style={{ backgroundColor: theme.main, color: theme.textOnMain }}
        >
          <ChevronLeft size={22} />
        </button>

        <h2 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
          {year}年 {MONTH_NAMES[month]}
        </h2>

        <button
          onClick={onNextMonth}
          className="w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-90"
          style={{ backgroundColor: theme.main, color: theme.textOnMain }}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className="text-center text-xs font-bold py-1"
            style={{ color: i === 0 ? theme.sun : i === 6 ? theme.sat : theme.textMuted }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={`e-${idx}`} />
          const key = getDayKey(date)
          const dayData = calendarData[key]
          return (
            <CalendarCell
              key={key}
              date={date}
              isToday={key === todayKey}
              holidayName={holidayMap[key] ?? null}
              stamps={dayData?.stamps || []}
              hasMemo={!!dayData?.memo}
              onClick={() => onDayClick(date)}
            />
          )
        })}
      </div>

      {/* 凡例 */}
      <div
        className="flex items-center gap-3 mt-3 pt-3 flex-wrap"
        style={{ borderTop: `1px solid ${theme.bg}` }}
      >
        <div className="flex items-center gap-1 ml-auto">
          <div className="w-5 h-4 rounded-xl" style={{ backgroundColor: theme.main }} />
          <span className="text-xs" style={{ color: theme.textMuted }}>今日</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="rounded-full"
            style={{ width: '6px', height: '6px', backgroundColor: theme.textMuted }}
          />
          <span className="text-xs" style={{ color: theme.textMuted }}>メモあり</span>
        </div>
      </div>
    </div>
  )
}
