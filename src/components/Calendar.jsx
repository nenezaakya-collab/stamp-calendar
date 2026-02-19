import { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HolidayJP from 'holiday-jp'
import { useTheme } from '../contexts/ThemeContext'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']
const MONTH_NAMES = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']

/** holiday-jp の date は「JST 0時 = UTC 前日15時」で返るため
 *  ローカルタイムで解釈すると JST 環境では正しい日付になる。
 *  念のため JST (+9h) を加算して UTC 日付で比較するヘルパーを使う。 */
const toJSTKey = (date) => {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  const y = jst.getUTCFullYear()
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0')
  const d = String(jst.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function Calendar({ currentDate, calendarData, getDayKey, onDayClick, onPrevMonth, onNextMonth }) {
  const { theme } = useTheme()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDow = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const today = new Date()
  const todayKey = getDayKey(today)

  // 祝日マップ { 'YYYY-MM-DD': '祝日名' }
  const holidayMap = useMemo(() => {
    const map = {}
    try {
      HolidayJP.between(firstDay, lastDay).forEach(h => {
        map[toJSTKey(h.date)] = h.name
      })
    } catch {
      // holiday-jp がカバーしない年は空のまま
    }
    return map
  }, [year, month])

  const touchStartX = useRef(null)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) onNextMonth()
      else onPrevMonth()
    }
    touchStartX.current = null
  }

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  // 数字色: 祝日 or 日曜 → sun(赤)  土曜 → sat(青)  平日 → textPrimary
  // 今日セルはtextOnMain固定
  const dowColor = (dow, isToday, isHoliday) => {
    if (isToday) return theme.textOnMain
    if (isHoliday || dow === 0) return theme.sun
    if (dow === 6) return theme.sat
    return theme.textPrimary
  }

  return (
    <div
      className="rounded-3xl p-3 sm:p-6 transition-colors duration-300"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: theme.cardBg,
        boxShadow: theme.cardShadow,
      }}
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
            style={{
              color: i === 0 ? theme.sun : i === 6 ? theme.sat : theme.textMuted,
            }}
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
          const stamps = dayData?.stamps || []
          const hasMemo = !!dayData?.memo
          const isToday = key === todayKey
          const dow = date.getDay()
          const holidayName = holidayMap[key] ?? null
          const isHoliday = !!holidayName

          // 4枚以下: そのまま表示 / 5枚以上: 3枚 + "…"
          const showEllipsis = stamps.length >= 5
          const gridStamps = showEllipsis ? stamps.slice(0, 3) : stamps.slice(0, 4)

          const cellBg = isToday ? theme.main : 'transparent'

          return (
            <button
              key={key}
              onClick={() => onDayClick(date)}
              className="relative flex flex-col items-center rounded-2xl pt-2 pb-1 px-0.5 transition-all active:scale-90"
              style={{
                backgroundColor: cellBg,
                height: '76px',
                overflow: 'hidden',
              }}
            >
              {/* 日付番号 */}
              <span
                className="text-sm sm:text-base font-bold leading-none"
                style={{ color: dowColor(dow, isToday, isHoliday) }}
              >
                {date.getDate()}
              </span>

              {/* 祝日名（2行折り返し・省略なし） */}
              {holidayName && (
                <span
                  className="w-full text-center mt-px"
                  style={{
                    fontSize: '8px',
                    lineHeight: '1.25',
                    color: isToday ? theme.textOnMain : theme.sun,
                    wordBreak: 'break-all',
                  }}
                  title={holidayName}
                >
                  {holidayName}
                </span>
              )}

              {/* スタンプ（2×2グリッド） */}
              {gridStamps.length > 0 && (
                <div
                  className="w-full mt-0.5"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px' }}
                >
                  {gridStamps.map((stamp, si) => (
                    <span
                      key={si}
                      className="text-center leading-none"
                      style={{ fontSize: '12px' }}
                    >{stamp}</span>
                  ))}
                  {showEllipsis && (
                    <span
                      className="text-center leading-none"
                      style={{ fontSize: '10px', color: isToday ? theme.textOnMain : theme.textMuted }}
                    >…</span>
                  )}
                </div>
              )}

              {/* メモインジケーター：右上にドット */}
              {hasMemo && (
                <div
                  className="absolute top-1 right-1 rounded-full"
                  style={{ width: '6px', height: '6px', backgroundColor: isToday ? theme.textOnMain : theme.textMuted }}
                  title="メモあり"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* 凡例 */}
      <div className="flex items-center gap-3 mt-3 pt-3 flex-wrap" style={{ borderTop: `1px solid ${theme.bg}` }}>
        {/* 今日 */}
        <div className="flex items-center gap-1 ml-auto">
          <div className="w-5 h-4 rounded-xl" style={{ backgroundColor: theme.main }} />
          <span className="text-xs" style={{ color: theme.textMuted }}>今日</span>
        </div>

        {/* メモあり */}
        <div className="flex items-center gap-1">
          <div className="rounded-full" style={{ width: '6px', height: '6px', backgroundColor: theme.textMuted }} />
          <span className="text-xs" style={{ color: theme.textMuted }}>メモあり</span>
        </div>
      </div>
    </div>
  )
}
