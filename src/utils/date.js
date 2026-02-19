/**
 * 日付ユーティリティ
 */

/** Date → 'YYYY-MM-DD' 文字列（ローカルタイム基準） */
export const getDayKey = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * holiday-jp が返す date は「JST 0時 = UTC 前日15時」のため、
 * 9時間分を加算して UTC 日付として解釈することで JST の日付に揃える。
 */
export const toJSTKey = (date) => {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  const y = jst.getUTCFullYear()
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0')
  const d = String(jst.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
