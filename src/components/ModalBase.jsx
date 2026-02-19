/**
 * モーダルの共通ラッパー。
 * 半透明のオーバーレイを表示し、オーバーレイをタップすると onClose を呼ぶ。
 * children にカードコンテンツを渡す。
 *
 * @param {{ onClose: Function, children: ReactNode, align?: string, padding?: string }}
 */
export default function ModalBase({
  onClose,
  children,
  align = 'items-end sm:items-center',
  padding = 'p-4',
}) {
  const handleBackdrop = (e) => {
    // カード内クリックは e.target が子要素になるため閉じない
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={`fixed inset-0 flex ${align} justify-center z-50 ${padding}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdrop}
    >
      {children}
    </div>
  )
}
