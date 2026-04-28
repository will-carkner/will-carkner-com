// Fetches the latest photo tweet from ArtGuide_db using free public APIs (no auth).
// Step 1: Get recent tweet IDs from Twitter syndication embed.
// Step 2: Resolve each via fxtwitter until we find one with a photo.
// Writes public/daily-art.json.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname } from 'node:path'

const HANDLE = process.env.X_USER_HANDLE || 'ArtGuide_db'
const OUTPUT = process.env.OUTPUT_PATH || 'public/daily-art.json'

async function getRecentTweetIds() {
  const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${HANDLE}`
  const res = await fetch(url, {
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

const latest = await getLatestPhotoTweet()
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
