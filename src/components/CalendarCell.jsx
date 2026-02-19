import { useTheme } from '../contexts/ThemeContext'

/**
 * カレンダーの1日分のセル。
 * @param {{ date: Date, isToday: boolean, holidayName: string|null, stamps: string[], hasMemo: boolean, onClick: Function }}
 */
export default function CalendarCell({ date, isToday, holidayName, stamps, hasMemo, onClick }) {
  const { theme } = useTheme()
  const dow = date.getDay()
  const isHoliday = !!holidayName

  const dateColor = () => {
    if (isToday) return theme.textOnMain
    if (isHoliday || dow === 0) return theme.sun
    if (dow === 6) return theme.sat
    return theme.textPrimary
  }

  // 4枚以下: そのまま表示 / 5枚以上: 3枚 + "…"
  const showEllipsis = stamps.length >= 5
  const gridStamps = showEllipsis ? stamps.slice(0, 3) : stamps.slice(0, 4)

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center rounded-2xl pt-2 pb-1 px-0.5 transition-all active:scale-90"
      style={{
        backgroundColor: isToday ? theme.main : 'transparent',
        height: '76px',
        overflow: 'hidden',
      }}
    >
      {/* 日付番号 */}
      <span
        className="text-sm sm:text-base font-bold leading-none"
        style={{ color: dateColor() }}
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
          {gridStamps.map((stamp, i) => (
            <span key={i} className="text-center leading-none" style={{ fontSize: '12px' }}>
              {stamp}
            </span>
          ))}
          {showEllipsis && (
            <span
              className="text-center leading-none"
              style={{ fontSize: '10px', color: isToday ? theme.textOnMain : theme.textMuted }}
            >
              …
            </span>
          )}
        </div>
      )}

      {/* メモインジケーター：右上にドット */}
      {hasMemo && (
        <div
          className="absolute top-1 right-1 rounded-full"
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: isToday ? theme.textOnMain : theme.textMuted,
          }}
          title="メモあり"
        />
      )}
    </button>
  )
}
