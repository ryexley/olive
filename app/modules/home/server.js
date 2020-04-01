import fs from "node:fs/promises"
import path from "node:path"
import { TIME } from "~/util"

const SCRIPT_SOURCE_BASE_URL = "https://biblereadingplangenerator.com/"
const SCRIPT_CACHE_BASE = "/scripts/bible-reading-plan-data-scripts"
const LOCAL_CACHE_DIR = path.resolve(`public${SCRIPT_CACHE_BASE}`)
const SCRIPT_SOURCE_URLS = [
  `${SCRIPT_SOURCE_BASE_URL}bible.data.js`,
  `${SCRIPT_SOURCE_BASE_URL}bible.data.languages.js`,
  `${SCRIPT_SOURCE_BASE_URL}bible.data.wordcounts.js`,
  `${SCRIPT_SOURCE_BASE_URL}bible.reference.js`,
  `${SCRIPT_SOURCE_BASE_URL}bible.plans.js`,
  `${SCRIPT_SOURCE_BASE_URL}bible.pericopes.js`,
]

// Ensure the cache directory exists
async function ensureCacheDir() {
  await fs.mkdir(LOCAL_CACHE_DIR, { recursive: true })
}

// Fetch and cache scripts if expired
async function fetchAndCacheBibleReadingPlanGeneratorDataScripts() {
  await ensureCacheDir()

  for (const url of SCRIPT_SOURCE_URLS) {
    const scriptName = path.basename(url)
    const cacheFilePath = path.join(LOCAL_CACHE_DIR, scriptName)
    let shouldDownload = false

    try {
      // Check if the file is already cached
      const stat = await fs.stat(cacheFilePath)
      const now = Date.now()
      const fileAge = now - stat.mtimeMs

      if (fileAge > TIME.ONE_WEEK) {
        shouldDownload = true
      }
    } catch {
      shouldDownload = true
    }

    if (shouldDownload) {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`)
      }

      const scriptContent = await response.text()
      await fs.writeFile(cacheFilePath, scriptContent)
    }
  }
}

export async function loader() {
  try {
    await fetchAndCacheBibleReadingPlanGeneratorDataScripts()
    const bibleDataCachedScripts = await Promise.all(
      SCRIPT_SOURCE_URLS.map(async url => {
        const scriptName = path.basename(url)
        const cachedFilePath = `${SCRIPT_CACHE_BASE}/${scriptName}`

        try {
          // Check if the file is already cached
          await fs.stat(path.resolve(LOCAL_CACHE_DIR, scriptName))
          return {
            src: cachedFilePath,
            attribution: `${SCRIPT_SOURCE_BASE_URL}${scriptName}`,
          }
        } catch {
          return false
        }
      }).filter(Boolean),
    )

    return { bibleDataCachedScripts }
  } catch (error) {
    console.error({ error })
    return {
      bibleDataCachedScripts: [],
    }
  }
}
