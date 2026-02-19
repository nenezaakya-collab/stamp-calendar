/**
 * SVG → PNG アイコン生成スクリプト (sharp 使用)
 * 使い方: node scripts/gen-icons.mjs
 */
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const svgBuf = readFileSync(join(root, 'public', 'icon.svg'))

async function generate(size, filename) {
  const out = join(root, 'public', filename)
  await sharp(svgBuf).resize(size, size).png().toFile(out)
  console.log(`✓ ${filename} (${size}×${size})`)
}

await generate(192, 'icon-192.png')
await generate(512, 'icon-512.png')
await generate(180, 'apple-touch-icon.png')
console.log('Done!')
