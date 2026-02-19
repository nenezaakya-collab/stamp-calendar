import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const WEEKDAYS_JP = ['日', '月', '火', '水', '木', '金', '土']

export default function DayModal({ date, stamps: initialStamps, memo: initialMemo, stampList, onUpdate, onClose }) {
  const { theme } = useTheme()
  const [stamps, setStamps] = useState(initialStamps || [])
  const [memo, setMemo] = useState(initialMemo || '')

  useEffect(() => {
    onUpdate(stamps, memo)
  }, [stamps, memo])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const toggleStamp = (emoji) => {
    setStamps(prev =>
      prev.includes(emoji) ? prev.filter(s => s !== emoji) : [...prev, emoji]
    )
  }

  const dateLabel = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${WEEKDAYS_JP[date.getDay()]}）`

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-3 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-3xl p-5 sm:p-6 relative"
        style={{
          backgroundColor: theme.cardBg,
          boxShadow: theme.modalShadow,
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full"
          style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
        >
          <X size={16} />
        </button>

        {/* 日付 + 選択済みスタンプ */}
        <div className="mb-5 pr-10">
          <h3 className="text-base sm:text-lg font-bold" style={{ color: theme.textPrimary }}>
            {dateLabel}
          </h3>
          {stamps.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {stamps.map((s, i) => (
                <span key={i} className="text-2xl">{s}</span>
              ))}
            </div>
          )}
        </div>

        {/* スタンプ選択パネル */}
        <div className="mb-5">
          <p className="text-sm font-medium mb-3" style={{ color: theme.textMuted }}>
            スタンプを選んでね
          </p>
          <div className="grid grid-cols-5 gap-2">
            {stampList.map(({ emoji, label, id }) => {
              const isSelected = stamps.includes(emoji)
              return (
                <button
                  key={id}
                  onClick={() => toggleStamp(emoji)}
                  className="flex flex-col items-center justify-center rounded-2xl py-2 px-1 transition-all active:scale-90"
                  style={{
                    backgroundColor: isSelected ? theme.main : theme.bg,
                    border: `2px solid ${isSelected ? theme.inputFocusBorder : 'transparent'}`,
                    boxShadow: isSelected ? `0 2px 8px ${theme.main}66` : 'none',
                  }}
                  title={label}
                >
                  <span className="text-2xl leading-none">{emoji}</span>
                  <span
                    className="leading-none mt-0.5 text-center"
                    style={{
                      fontSize: '9px',
                      color: isSelected ? theme.textOnMain : theme.textMuted,
                    }}
                  >
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* メモ欄 */}
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: theme.textMuted }}>
            メモ
          </p>
          <textarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="今日の一言メモ..."
            maxLength={100}
            rows={3}
            className="w-full rounded-2xl px-4 py-3 text-sm resize-none outline-none"
            style={{
              backgroundColor: theme.bg,
              color: theme.textPrimary,
              border: `2px solid ${theme.inputBorder}`,
              fontFamily: 'Zen Maru Gothic, sans-serif',
            }}
            onFocus={e => e.target.style.border = `2px solid ${theme.inputFocusBorder}`}
            onBlur={e => e.target.style.border = `2px solid ${theme.inputBorder}`}
          />
          <p className="text-right text-xs mt-1" style={{ color: theme.textMuted }}>
            {memo.length}/100
          </p>
        </div>

        {/* 完了ボタン */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 rounded-2xl font-bold transition-all active:scale-95"
          style={{
            backgroundColor: theme.main,
            color: theme.textOnMain,
            boxShadow: `0 4px 16px ${theme.main}80`,
          }}
        >
          完了 ✓
        </button>
      </div>
    </div>
  )
}
