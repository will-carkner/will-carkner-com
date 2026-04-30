#!/usr/bin/env node
/**
 * One-shot image compression for public/ assets.
 * Resizes oversized images and re-encodes at reasonable quality.
 * Run: node scripts/compress-images.mjs
 */
import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'

const ROOT = new URL('../public/', import.meta.url).pathname

// [glob-ish path, max width, quality, force format or null]
const TARGETS = [
  { dir: 'projects', maxW: 1200, quality: 82 },
  { dir: 'cool-photos', maxW: 1600, quality: 80 },
  { dir: 'records', maxW: 400, quality: 82 },
  { dir: '', maxW: 1200, quality: 82, single: true }, // root-level imgs only
]

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const isImg = (p) => /\.(jpe?g|png)$/i.test(p)

async function processOne(file, maxW, quality) {
  const ext = extname(file).toLowerCase()
  const before = (await stat(file)).size
  const img = sharp(file)
  const meta = await img.metadata()
  const targetW = Math.min(meta.width ?? maxW, maxW)
  const resized = img.resize({ width: targetW, withoutEnlargement: true })

  const tmp = file + '.tmp'
  if (ext === '.png') {
    // Convert PNG → JPEG only for big photographic PNGs (>500 KB)
    if (before > 500_000) {
      const jpgTmp = file.replace(/\.png$/i, '.jpg') + '.tmp'
      await resized.jpeg({ quality, mozjpeg: true }).toFile(jpgTmp)
      const newFile = file.replace(/\.png$/i, '.jpg')
      await unlink(file)
      await rename(jpgTmp, newFile)
      const after = (await stat(newFile)).size
      return { file, newFile, before, after, converted: true }
    }
    await resized.png({ compressionLevel: 9, palette: true }).toFile(tmp)
  } else {
    await resized.jpeg({ quality, mozjpeg: true }).toFile(tmp)
  }
  await rename(tmp, file)
  const after = (await stat(file)).size
  return { file, before, after }
}

let totalBefore = 0
let totalAfter = 0
const renames = []

for (const t of TARGETS) {
  const base = t.dir ? join(ROOT, t.dir) : ROOT
  let files
  if (t.single) {
    files = (await readdir(base))
      .filter(isImg)
      .map((f) => join(base, f))
  } else {
    try {
      files = (await walk(base)).filter(isImg)
    } catch {
      continue
    }
  }
  for (const f of files) {
    try {
      const r = await processOne(f, t.maxW, t.quality)
      totalBefore += r.before
      totalAfter += r.after
      if (r.converted) {
        renames.push([basename(r.file), basename(r.newFile), dirname(r.file)])
      }
      const pct = (((r.before - r.after) / r.before) * 100).toFixed(0)
      console.log(
        `${r.converted ? '→' : ' '} ${f.replace(ROOT, '')}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB (-${pct}%)`,
      )
    } catch (e) {
      console.warn(`skip ${f}: ${e.message}`)
    }
  }
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB (saved ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)`,
)

if (renames.length) {
  console.log('\nPNG → JPG renames (update source references):')
  for (const [from, to] of renames) console.log(`  ${from} → ${to}`)
}
