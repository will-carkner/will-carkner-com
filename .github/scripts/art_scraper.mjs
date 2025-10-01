// Node 18+ (has global fetch). Writes public/daily-art.json.
// Finds the most recent tweet with a PHOTO (ignores replies/RTs).

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname } from 'node:path'

import { config as loadEnv } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../../') // up from .github/scripts to repo root

loadEnv({ path: path.join(projectRoot, '.env') })

const BEARER = process.env.X_BEARER_TOKEN
const USER_ID = process.env.X_USER_ID || ''
const HANDLE = process.env.X_USER_HANDLE || 'ArtGuide_db'
const OUTPUT = process.env.OUTPUT_PATH || 'public/daily-art.json'

// Debug: log the BEARER value (should not be undefined or empty)
console.log('Loaded X_BEARER_TOKEN:', BEARER ? '[OK]' : '[MISSING]')

const API_HOSTS = ['https://api.x.com/2']

if (!BEARER) {
  console.error('Missing X_BEARER_TOKEN')
  process.exit(1)
}

async function xFetch(urlPath) {
  let lastErr
  for (const base of API_HOSTS) {
    try {
      const r = await fetch(base + urlPath, {
        headers: { Authorization: `Bearer ${BEARER}` },
        cache: 'no-store',
      })
      if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text()}`)
      return await r.json()
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr
}

async function getUserId() {
  if (USER_ID) return USER_ID
  const data = await xFetch(`/users/by/username/${encodeURIComponent(HANDLE)}`)
  return data?.data?.id
}

function pickBestPhoto(resp) {
  const mediaByKey = new Map()
  ;(resp.includes?.media || []).forEach((m) => mediaByKey.set(m.media_key, m))

  for (const t of resp.data || []) {
    const keys = t.attachments?.media_keys || []
    const photo = keys
      .map((k) => mediaByKey.get(k))
      .find((m) => m && m.type === 'photo' && (m.url || m.preview_image_url))
    if (photo) {
      // Extract painting name and artist from the tweet text, remove URLs, and lowercase
      // Extract "Artist Name Artwork Title, Year" before the URL, lowercase
      const cleanedText = (t.text || '')
        .replace(/https?:\/\/\S+/g, '') // Remove URLs
        .replace(/\s+$/, '') // Remove trailing spaces
        .toLowerCase()
        .trim()
      return {
        tweetId: t.id,
        text: cleanedText,
        created_at: t.created_at,
        photoUrl: photo.url || photo.preview_image_url,
      }
    }
  }
  return null
}

async function getLatestPhotoTweet(userId) {
  // paginate up to ~300 tweets to find the latest photo
  let next = ''
  for (let i = 0; i < 2; i++) {
    const params = new URLSearchParams({
      exclude: 'retweets,replies',
      max_results: '5',
      'tweet.fields': 'created_at',
      expansions: 'attachments.media_keys',
      'media.fields': 'url,preview_image_url,alt_text,type',
    })
    if (next) params.set('pagination_token', next)

    const data = await xFetch(`/users/${userId}/tweets?${params}`)
    const chosen = pickBestPhoto(data)
    if (chosen) return chosen

    next = data.meta?.next_token || ''
    if (!next) break
  }
  return null
}

async function loadPrevious() {
  if (!existsSync(OUTPUT)) return null
  try {
    const txt = await readFile(OUTPUT, 'utf8')
    return JSON.parse(txt)
  } catch {
    return null
  }
}

async function saveJSON(obj) {
  await mkdir(dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, JSON.stringify(obj, null, 2), 'utf8')
}

;(async function main() {
  const userId = await getUserId()
  if (!userId) throw new Error(`Could not resolve user id for ${HANDLE}`)

  const latest = await getLatestPhotoTweet(userId)
  const prev = await loadPrevious()

  if (!latest) {
    console.log('No photo tweet found — keeping previous file (if any).')
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
})()
