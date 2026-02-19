import { useState } from 'react'
import { Settings, Palette } from 'lucide-react'
import Calendar from './components/Calendar'
import DayModal from './components/DayModal'
import StampManager from './components/StampManager'
import ThemePicker from './components/ThemePicker'
import InstallPrompt from './components/InstallPrompt'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { useCalendarData } from './hooks/useCalendarData'
import { useStampList } from './hooks/useStampList'
import { getDayKey } from './utils/date'

function AppInner() {
  const { theme } = useTheme()
  const { calendarData, updateDay } = useCalendarData()
  const [stampList, setStampList] = useStampList()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [showStampManager, setShowStampManager] = useState(false)
  const [showThemePicker, setShowThemePicker] = useState(false)

  const selectedDayData = selectedDay
    ? calendarData[getDayKey(selectedDay)] || { stamps: [], memo: '' }
    : null

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.bg }}>
      <div className="w-full max-w-lg mx-auto px-3 py-6 sm:px-4 sm:py-8">

        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: theme.textPrimary }}>
              スタンプカレンダー
            </h1>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: theme.textMuted }}>
              毎日をスタンプで記録しよう
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowThemePicker(true)}
              className="w-10 h-10 flex items-center justify-center rounded-2xl transition-all active:scale-95"
              style={{
                backgroundColor: theme.sub,
                color: theme.textOnMain === '#1A1A1A' ? theme.textOnMain : theme.textPrimary,
                boxShadow: theme.cardShadow,
              }}
              title="テーマ切り替え"
            >
              <Palette size={18} />
            </button>

            <button
              onClick={() => setShowStampManager(true)}
              className="w-10 h-10 flex items-center justify-center rounded-2xl transition-all active:scale-95"
              style={{
                backgroundColor: theme.main,
                color: theme.textOnMain,
                boxShadow: theme.cardShadow,
              }}
              title="スタンプ管理"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <Calendar
          currentDate={currentDate}
          calendarData={calendarData}
          onDayClick={(date) => setSelectedDay(date)}
          onPrevMonth={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          onNextMonth={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
        />

        <p className="text-center text-xs mt-6" style={{ color: theme.textMuted }}>
          © 2026 kumakana
        </p>
      </div>

      {selectedDay && selectedDayData && (
        <DayModal
          date={selectedDay}
          stamps={selectedDayData.stamps}
          memo={selectedDayData.memo}
          stampList={stampList}
          onUpdate={(stamps, memo) => updateDay(selectedDay, stamps, memo)}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {showStampManager && (
        <StampManager
          stamps={stampList}
          onUpdate={setStampList}
          onClose={() => setShowStampManager(false)}
        />
      )}

      {showThemePicker && (
        <ThemePicker onClose={() => setShowThemePicker(false)} />
      )}

      <InstallPrompt />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
