import { useState } from 'react'
import { X, Plus, RotateCcw, Pencil, Check } from 'lucide-react'
import { DEFAULT_STAMPS } from '../constants/defaultStamps'
import { useTheme } from '../contexts/ThemeContext'
import ModalBase from './ModalBase'

export default function StampManager({ stamps, onUpdate, onClose }) {
  const { theme } = useTheme()
  const [editingId, setEditingId] = useState(null)
  const [editLabel, setEditLabel] = useState('')
  const [newEmoji, setNewEmoji] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const startEdit = (stamp) => {
    setEditingId(stamp.id)
    setEditLabel(stamp.label)
  }

  const commitEdit = (id) => {
    if (!editLabel.trim()) return
    onUpdate(stamps.map(s => s.id === id ? { ...s, label: editLabel.trim() } : s))
    setEditingId(null)
  }

  const deleteStamp = (id) => {
    onUpdate(stamps.filter(s => s.id !== id))
  }

  const addStamp = () => {
    const emoji = newEmoji.trim()
    const label = newLabel.trim()
    if (!emoji || !label) return
    onUpdate([...stamps, { id: `custom-${Date.now()}`, emoji, label }])
    setNewEmoji('')
    setNewLabel('')
    setShowAddForm(false)
  }

  const resetToDefaults = () => {
    if (confirm('スタンプをデフォルトに戻しますか？\nカスタムスタンプは削除されます。')) {
      onUpdate([...DEFAULT_STAMPS])
    }
  }

  const isDefault = (id) => DEFAULT_STAMPS.some(s => s.id === id)

  return (
    <ModalBase onClose={onClose}>
      <div
        className="w-full max-w-md rounded-3xl relative flex flex-col"
        style={{ backgroundColor: theme.cardBg, boxShadow: theme.modalShadow, maxHeight: '88vh' }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>
            スタンプ管理
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
          >
            <X size={16} />
          </button>
        </div>

        {/* スタンプ一覧 */}
        <div className="overflow-y-auto flex-1 px-6 pb-2">
          <div className="flex flex-col gap-2">
            {stamps.map(stamp => (
              <div
                key={stamp.id}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5"
                style={{ backgroundColor: theme.bg }}
              >
                <span className="text-2xl w-9 text-center flex-shrink-0">{stamp.emoji}</span>

                {editingId === stamp.id ? (
                  <input
                    autoFocus
                    value={editLabel}
                    onChange={e => setEditLabel(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') commitEdit(stamp.id)
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                    maxLength={10}
                    className="flex-1 rounded-xl px-3 py-1 text-sm outline-none"
                    style={{
                      border: `2px solid ${theme.inputBorder}`,
                      color: theme.textPrimary,
                      backgroundColor: theme.cardBg,
                      fontFamily: 'Zen Maru Gothic, sans-serif',
                    }}
                  />
                ) : (
                  <span className="flex-1 text-sm font-medium" style={{ color: theme.textPrimary }}>
                    {stamp.label}
                    {isDefault(stamp.id) && (
                      <span
                        className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: theme.sub, color: theme.textPrimary }}
                      >
                        デフォルト
                      </span>
                    )}
                  </span>
                )}

                {editingId === stamp.id ? (
                  <button
                    onClick={() => commitEdit(stamp.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{ backgroundColor: theme.sub, color: theme.textPrimary }}
                  >
                    <Check size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(stamp)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{ backgroundColor: theme.bg, color: theme.textMuted }}
                  >
                    <Pencil size={14} />
                  </button>
                )}

                <button
                  onClick={() => deleteStamp(stamp.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ backgroundColor: theme.bg, color: theme.sun }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <div
          className="px-6 pb-6 pt-3 flex-shrink-0"
          style={{ borderTop: `1px solid ${theme.bg}` }}
        >
          {showAddForm ? (
            <div className="rounded-2xl p-4 mb-3" style={{ backgroundColor: theme.bg }}>
              <p className="text-xs font-medium mb-3" style={{ color: theme.textMuted }}>
                新しいスタンプを追加
              </p>
              <div className="flex gap-2 mb-2">
                <input
                  value={newEmoji}
                  onChange={e => setNewEmoji(e.target.value)}
                  placeholder="絵文字"
                  maxLength={4}
                  className="w-16 text-center rounded-xl px-2 py-2 text-xl outline-none"
                  style={{
                    border: `2px solid ${theme.inputBorder}`,
                    color: theme.textPrimary,
                    backgroundColor: theme.cardBg,
                    fontFamily: 'Zen Maru Gothic, sans-serif',
                  }}
                />
                <input
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  placeholder="名前（例：ジム）"
                  maxLength={10}
                  onKeyDown={e => { if (e.key === 'Enter') addStamp() }}
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    border: `2px solid ${theme.inputBorder}`,
                    color: theme.textPrimary,
                    backgroundColor: theme.cardBg,
                    fontFamily: 'Zen Maru Gothic, sans-serif',
                  }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
                >
                  キャンセル
                </button>
                <button
                  onClick={addStamp}
                  disabled={!newEmoji.trim() || !newLabel.trim()}
                  className="flex-1 py-2 rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: (!newEmoji.trim() || !newLabel.trim())
                      ? theme.main + '88'
                      : theme.main,
                    color: theme.textOnMain,
                  }}
                >
                  追加する
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-3 rounded-2xl font-bold mb-2 flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                backgroundColor: theme.main,
                color: theme.textOnMain,
                boxShadow: `0 4px 16px ${theme.main}66`,
              }}
            >
              <Plus size={18} />
              スタンプを追加
            </button>
          )}

          <button
            onClick={resetToDefaults}
            className="w-full py-2.5 rounded-2xl text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: theme.bg, color: theme.textMuted }}
          >
            <RotateCcw size={14} />
            デフォルトに戻す
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
