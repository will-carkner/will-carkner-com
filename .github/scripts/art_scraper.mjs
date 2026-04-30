// Fetches the latest photo tweet from ArtGuide_db using free public APIs (no auth).
// Step 1: Get recent tweet IDs from Twitter syndication embed.
// Step 2: Resolve each via fxtwitter until we find one with a photo.
// Writes public/daily-art.json.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync, createWriteStream, unlinkSync } from 'node:fs'
import { dirname, extname } from 'node:path'
import https from 'node:https'
import http from 'node:http'

const HANDLE = process.env.X_USER_HANDLE || 'ArtGuide_db'
const OUTPUT = process.env.OUTPUT_PATH || 'public/daily-art.json'
const ARCHIVE = 'public/art-archive.json'
const ART_DIR = 'public/art-archive'

async function downloadImage(url, dest) {
  await mkdir(dirname(dest), { recursive: true })
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http
    mod.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        resolve(false)
        return
      }
      const ws = createWriteStream(dest)
      res.pipe(ws)
      ws.on('finish', () => { ws.close(); resolve(true) })
      ws.on('error', (e) => { if (existsSync(dest)) unlinkSync(dest); reject(e) })
    }).on('error', reject).on('timeout', function () { this.destroy(); resolve(false) })
  })
}

async function fetchWithRetry(url, opts = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, opts)
    if (res.ok) return res
    if (res.status === 429 && i < retries - 1) {
      const delay = 2 ** i * 5_000
      console.log(`429 rate-limited, retrying in ${delay / 1000}s (attempt ${i + 2}/${retries})`)
      await new Promise((r) => setTimeout(r, delay))
      continue
    }
    return res
  }
}

async function getRecentTweetIds() {
  const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${HANDLE}`
  const res = await fetchWithRetry(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bot)' },
  })
  if (!res.ok) throw new Error(`Syndication HTTP ${res.status}`)
  const html = await res.text()
  const ids = [...html.matchAll(/\/status\/(\d+)/g)].map((m) => m[1])
  return [...new Set(ids)]
}

async function getTweetData(tweetId) {
  const res = await fetch(`https://api.fxtwitter.com/${HANDLE}/status/${tweetId}`)
  if (!res.ok) return null
  const data = await res.json()
  const tweet = data.tweet
  if (!tweet) return null

  const photo = tweet.media?.photos?.[0]
  if (!photo) return null

  const cleanedText = (tweet.text || '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+$/, '')
    .toLowerCase()
    .trim()

  return {
    tweetId: tweet.id,
    text: cleanedText,
    created_at: tweet.created_at,
    photoUrl: photo.url,
  }
}

async function getLatestPhotoTweet() {
  const ids = await getRecentTweetIds()
  console.log(`Found ${ids.length} recent tweet IDs`)

  for (const id of ids) {
    const data = await getTweetData(id)
    if (data) return data
  }
  return null
}

async function loadPrevious() {
  if (!existsSync(OUTPUT)) return null
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8'))
  } catch {
    return null
  }
}

async function saveJSON(obj) {
  await mkdir(dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, JSON.stringify(obj, null, 2), 'utf8')
}

let latest
try {
  latest = await getLatestPhotoTweet()
} catch (err) {
  console.log(`Failed to fetch tweets: ${err.message} — keeping previous file.`)
  process.exit(0)
}
const prev = await loadPrevious()

if (!latest) {
  console.log('No photo tweet found — keeping previous file.')
  process.exit(0)
}

const newPayload = {
  id: `https://x.com/${HANDLE}/status/${latest.tweetId}`,
  text: latest.text,
  imageUrl: latest.photoUrl,
  tweetUrl: `https://x.com/${HANDLE}/status/${latest.tweetId}`,
  date: latest.created_at,
  author: HANDLE,
  cachedAt: new Date().toISOString(),
}

if (prev && prev.tweetUrl === newPayload.tweetUrl) {
  console.log('Latest photo is unchanged — no write.')
  process.exit(0)
}

await saveJSON(newPayload)
console.log('Wrote:', OUTPUT, newPayload.tweetUrl, newPayload.imageUrl)

// Download image locally and append to archive
const tweetId = latest.tweetId
const ext = extname(new URL(latest.photoUrl).pathname) || '.jpg'
const localFilename = `${tweetId}${ext}`
const localPath = `${ART_DIR}/${localFilename}`

let localImageUrl = newPayload.imageUrl
try {
  const ok = await downloadImage(latest.photoUrl, localPath)
  if (ok) {
    localImageUrl = `/art-archive/${localFilename}`
    console.log('Downloaded image:', localPath)
  } else {
    console.log('Failed to download image, using remote URL')
  }
} catch (e) {
  console.log('Image download error:', e.message)
}

let archive = []
try {
  archive = JSON.parse(await readFile(ARCHIVE, 'utf8'))
} catch {}
const alreadyArchived = archive.some((e) => e.tweetUrl === newPayload.tweetUrl)
if (!alreadyArchived) {
  archive.unshift({ ...newPayload, imageUrl: localImageUrl })
  await writeFile(ARCHIVE, JSON.stringify(archive, null, 2), 'utf8')
  console.log('Appended to archive:', ARCHIVE)
}
