/**
 * テーマ定義
 * 全テキストカラーはWCAG AA（4.5:1以上）を確認済み
 *
 * 凡例:
 *   bg         - ページ背景
 *   cardBg     - カード・モーダル背景
 *   main       - ボタン・今日セル等のプライマリアクセント
 *   sub        - バッジ・インジケーター等のサブアクセント
 *   textPrimary  - 本文テキスト（高コントラスト）
 *   textMuted    - サブテキスト（最小4.5:1保証）
 *   textOnMain   - main色背景上のテキスト
 *   sun        - 日曜日の色
 *   sat        - 土曜日の色
 *   inputBorder / inputFocusBorder - 入力欄のボーダー色
 *   cardShadow / modalShadow       - 影
 */
export const THEMES = [
  {
    id: 'sakura',
    name: 'さくらもち',
    emoji: '🌸',
    bg: '#FFF9FB',
    cardBg: '#FFFFFF',
    main: '#FFB7C5',
    sub: '#B2EBD8',
    textPrimary: '#5C4A4A',   // on bg  8.0:1 ✓ / on cardBg 8.1:1 ✓
    textMuted: '#7A6363',     // on bg  5.3:1 ✓ / on cardBg 5.5:1 ✓
    textOnMain: '#5C4A4A',    // on main(#FFB7C5) 5.1:1 ✓
    sun: '#BE2D52',           // on bg  5.5:1 ✓
    sat: '#2E5FA3',           // on bg  6.1:1 ✓
    inputBorder: '#FFB7C5',
    inputFocusBorder: '#F0567A',
    cardShadow: '0 4px 24px rgba(255, 183, 197, 0.25)',
    modalShadow: '0 8px 40px rgba(255, 183, 197, 0.4)',
  },
  {
    id: 'goma',
    name: '黒ゴマだんご',
    emoji: '🖤',
    bg: '#FAFAFA',
    cardBg: '#FFFFFF',
    main: '#2C2C2C',
    sub: '#E0E0E0',
    textPrimary: '#2C2C2C',   // on cardBg 13.9:1 ✓ / on bg 13.3:1 ✓
    textMuted: '#5C5C5C',     // on cardBg  6.7:1 ✓ / on bg  6.4:1 ✓
    textOnMain: '#FFFFFF',    // on main(#2C2C2C) 13.9:1 ✓
    sun: '#BE2D52',           // on bg  5.5:1 ✓
    sat: '#2E5FA3',           // on bg  6.1:1 ✓
    inputBorder: '#C8C8C8',
    inputFocusBorder: '#2C2C2C',
    cardShadow: '0 4px 24px rgba(44, 44, 44, 0.1)',
    modalShadow: '0 8px 40px rgba(44, 44, 44, 0.18)',
  },
  {
    id: 'matcha',
    name: 'まっちゃ',
    emoji: '🍵',
    bg: '#F2F8E8',
    cardBg: '#FFFFFF',
    main: '#A8D060',
    sub: '#F8F6E8',
    textPrimary: '#3A5A2A',   // on bg  7.2:1 ✓ / on cardBg 7.8:1 ✓
    textMuted: '#537033',     // on bg  5.2:1 ✓ / on cardBg 5.6:1 ✓
    textOnMain: '#2A4220',    // on main(#A8D060) 6.3:1 ✓
    sun: '#A0283D',           // on bg  6.8:1 ✓
    sat: '#2D5B89',           // on bg  6.5:1 ✓
    inputBorder: '#A8D060',
    inputFocusBorder: '#5A8020',
    cardShadow: '0 4px 24px rgba(168, 208, 96, 0.20)',
    modalShadow: '0 8px 40px rgba(168, 208, 96, 0.35)',
  },
  {
    id: 'soda',
    name: 'ソーダもち',
    emoji: '🧊',
    bg: '#F0F8FF',
    cardBg: '#FFFFFF',
    main: '#87CEEB',
    sub: '#B8DFF5',
    textPrimary: '#1A3A5C',   // on bg 10.9:1 ✓ / on cardBg 12.8:1 ✓
    textMuted: '#2E5A84',     // on bg  6.8:1 ✓ / on cardBg  8.0:1 ✓
    textOnMain: '#1A3A5C',   // on main(#87CEEB) 6.6:1 ✓
    sun: '#C0324D',           // on bg  5.2:1 ✓
    sat: '#2E5FA3',           // on bg  6.0:1 ✓
    inputBorder: '#87CEEB',
    inputFocusBorder: '#4BA8D5',
    cardShadow: '0 4px 24px rgba(135, 206, 235, 0.25)',
    modalShadow: '0 8px 40px rgba(135, 206, 235, 0.4)',
  },
  {
    id: 'lavender',
    name: 'ラベンダーもち',
    emoji: '💜',
    bg: '#FAF7FF',
    cardBg: '#FFFFFF',
    main: '#C8A8E9',
    sub: '#E4D4F4',
    textPrimary: '#2D1A45',   // on bg 15.0:1 ✓ / on cardBg 16.9:1 ✓
    textMuted: '#5A3B75',     // on bg  8.7:1 ✓ / on cardBg 10.0:1 ✓
    textOnMain: '#2D1A45',   // on main(#C8A8E9) 7.6:1 ✓
    sun: '#BE2D52',           // on bg  5.5:1 ✓
    sat: '#3B3FA0',           // on bg  8.4:1 ✓
    inputBorder: '#C8A8E9',
    inputFocusBorder: '#A070D0',
    cardShadow: '0 4px 24px rgba(200, 168, 233, 0.25)',
    modalShadow: '0 8px 40px rgba(200, 168, 233, 0.4)',
  },
]

export const DEFAULT_THEME_ID = 'sakura'
