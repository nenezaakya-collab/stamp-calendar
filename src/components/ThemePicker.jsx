import { X, Check } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import ModalBase from './ModalBase'

export default function ThemePicker({ onClose }) {
  const { theme, themeId, setThemeId, themes } = useTheme()

  const select = (id) => {
    setThemeId(id)
    onClose()
  }

  return (
    <ModalBase onClose={onClose}>
      <div
        className="w-full max-w-md rounded-3xl p-6 relative"
        style={{ backgroundColor: theme.cardBg, boxShadow: theme.modalShadow }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>
            テーマ
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
          >
            <X size={16} />
          </button>
        </div>

        {/* テーマ一覧 */}
        <div className="flex flex-col gap-2">
          {themes.map(t => {
            const isSelected = t.id === themeId
            return (
              <button
                key={t.id}
                onClick={() => select(t.id)}
                className="flex items-center gap-4 rounded-2xl px-4 py-3 w-full text-left transition-all active:scale-95"
                style={{
                  backgroundColor: isSelected ? theme.main : theme.bg,
                  border: `2px solid ${isSelected ? theme.inputFocusBorder : 'transparent'}`,
                }}
              >
                <span className="text-2xl w-8 flex-shrink-0 text-center">{t.emoji}</span>

                <span
                  className="flex-1 text-sm font-bold"
                  style={{ color: isSelected ? theme.textOnMain : theme.textPrimary }}
                >
                  {t.name}
                </span>

                <div className="flex gap-1 flex-shrink-0">
                  <span className="w-5 h-5 rounded-full border-2" style={{ backgroundColor: t.main, borderColor: t.cardBg }} />
                  <span className="w-5 h-5 rounded-full border-2" style={{ backgroundColor: t.sub, borderColor: t.cardBg }} />
                  <span className="w-5 h-5 rounded-full border-2" style={{ backgroundColor: t.bg, borderColor: t.textMuted + '44' }} />
                </div>

                <span
                  className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: isSelected ? theme.textOnMain : 'transparent',
                    color: isSelected ? theme.main : 'transparent',
                  }}
                >
                  {isSelected && <Check size={14} />}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </ModalBase>
  )
}
