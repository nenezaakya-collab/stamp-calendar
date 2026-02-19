import { useState, useEffect } from 'react'
import { X, Download, Share } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

/** iOS Safari かどうか判定 */
const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream

/** スタンドアロン（既にホーム画面から起動中）か判定 */
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true

export default function InstallPrompt() {
  const { theme } = useTheme()

  // beforeinstallprompt イベント (Chrome/Android)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  // iOS 向け手順モーダル
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  // バナーを閉じた後は再表示しない
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('pwa-prompt-dismissed') === '1'
  )

  useEffect(() => {
    // 既にインストール済みなら何もしない
    if (isStandalone()) return

    if (isIOS()) {
      // iOS: sessionStorage に閉じた記録がなければ短時間後に案内を表示
      if (!dismissed) {
        const t = setTimeout(() => setShowIOSGuide(true), 3000)
        return () => clearTimeout(t)
      }
    } else {
      // Android/Chrome: beforeinstallprompt をキャプチャ
      const handler = (e) => {
        e.preventDefault()
        setDeferredPrompt(e)
      }
      window.addEventListener('beforeinstallprompt', handler)
      return () => window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [dismissed])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setDeferredPrompt(null)
    dismiss()
  }

  const dismiss = () => {
    sessionStorage.setItem('pwa-prompt-dismissed', '1')
    setDismissed(true)
    setDeferredPrompt(null)
    setShowIOSGuide(false)
  }

  // ─── Android/Chrome バナー ──────────────────────
  if (deferredPrompt && !dismissed) {
    return (
      <div
        className="fixed bottom-4 left-0 right-0 mx-3 sm:mx-auto sm:max-w-sm z-50 rounded-3xl px-5 py-4 flex items-center gap-3"
        style={{
          backgroundColor: theme.cardBg,
          boxShadow: theme.modalShadow,
        }}
      >
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-2xl"
          style={{ backgroundColor: theme.main }}
        >
          <Download size={18} style={{ color: theme.textOnMain }} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight" style={{ color: theme.textPrimary }}>
            ホーム画面に追加
          </p>
          <p className="text-xs leading-tight mt-0.5" style={{ color: theme.textMuted }}>
            オフラインでも使えるようになります
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-bold"
          style={{ backgroundColor: theme.main, color: theme.textOnMain }}
        >
          追加
        </button>

        <button
          onClick={dismiss}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full"
          style={{ backgroundColor: theme.bg, color: theme.textMuted }}
        >
          <X size={14} />
        </button>
      </div>
    )
  }

  // ─── iOS 手順モーダル ─────────────────────────────
  if (showIOSGuide && !dismissed) {
    return (
      <div
        className="fixed inset-0 flex items-end justify-center z-50 p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
        onClick={dismiss}
      >
        <div
          className="w-full max-w-sm rounded-3xl p-6"
          style={{ backgroundColor: theme.cardBg, boxShadow: theme.modalShadow }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base" style={{ color: theme.textPrimary }}>
              ホーム画面に追加
            </h3>
            <button
              onClick={dismiss}
              className="w-7 h-7 flex items-center justify-center rounded-full"
              style={{ backgroundColor: theme.bg, color: theme.textMuted }}
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
            アプリとして使えるようになります。オフラインでも動作します。
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                step: '1',
                icon: <Share size={16} />,
                text: (
                  <>
                    Safari 下部の <strong>「共有」</strong> ボタン
                    <span className="text-base ml-1">⎙</span> をタップ
                  </>
                ),
              },
              {
                step: '2',
                icon: <span className="text-base leading-none">＋</span>,
                text: (
                  <>
                    <strong>「ホーム画面に追加」</strong> を選択
                  </>
                ),
              },
              {
                step: '3',
                icon: <span className="text-base leading-none">✓</span>,
                text: '右上の「追加」をタップ',
              },
            ].map(({ step, icon, text }) => (
              <div key={step} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl text-sm font-bold"
                  style={{ backgroundColor: theme.main, color: theme.textOnMain }}
                >
                  {icon}
                </div>
                <p className="text-sm leading-relaxed pt-1" style={{ color: theme.textPrimary }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={dismiss}
            className="w-full mt-5 py-3 rounded-2xl text-sm font-bold"
            style={{ backgroundColor: theme.main, color: theme.textOnMain }}
          >
            わかった！
          </button>
        </div>
      </div>
    )
  }

  return null
}
