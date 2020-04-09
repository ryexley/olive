import { isEmpty, isNotEmpty } from "../util"
import {
  BIBLE_DATA,
  DEFAULT_BOOK_LIST,
  OLD_TESTAMENT_BOOKS,
  NEW_TESTAMENT_BOOKS,
  DEUTEROCANONICAL_BOOKS
} from "./data"

export const daysOfTheWeek = [
  { name: "sunday", value: 0, label: "Sunday" },
  { name: "monday", value: 1, label: "Monday" },
  { name: "tuesday", value: 2, label: "Tuesday" },
  { name: "wednesday", value: 3, label: "Wednesday" },
  { name: "thursday", value: 4, label: "Thursday" },
  { name: "friday", value: 5, label: "Friday" },
  { name: "saturday", value: 6, label: "Saturday" },
]

export function enhanceDatePrototype() {
  Date.prototype.addDays = function addDays(d) {
    return new Date(this.getTime() + d * 24 * 60 * 60 * 1000)
  }

  Date.prototype.incrementDay = function incrementDay() {
    const next = new Date(this)
    next.setDate(next.getDate() + 1)

    return next
  }

  Date.prototype.monthAbbreviation = function monthAbbreviation(lang) {
    return this.toLocaleDateString(lang, { month: "short" })
  }

  Date.prototype.monthName = function monthName(lang) {
    return this.toLocaleDateString(lang, { month: "long" })
  }

  Date.prototype.formatted = function formatted() {
    return `${this.getFullYear()}/${this.getMonth() + 1}/${this.getDate()}`
  }

  Date.prototype.toInputField = function toInputField() {
    const rawMonth = this.getMonth() + 1
    const rawDay = this.getDate()
    const year = this.getFullYear().toString()
    const month = rawMonth > 9 ? rawMonth.toString() : `0${rawMonth}`
    const day = rawDay > 9 ? rawDay.toString() : `0${rawDay}`

    return `${year}-${month}-${day}`
  }
}

export function restoreDatePrototype() {
  Date.prototype.addDays = undefined
  Date.prototype.incrementDay = undefined
  Date.prototype.monthAbbreviation = undefined
  Date.prototype.monthName = undefined
  Date.prototype.formatted = undefined
  Date.prototype.toInputField = undefined
}

export function getArrayValue({ target, lang, property }) {
  if (isEmpty(target)) {
    return ""
  }

  if (isEmpty(target[property])) {
    return ""
  }

  if (isNotEmpty(lang) && isNotEmpty(target[property][lang])) {
    return target[property][lang][0]
  } else {
    return target[property]["en"][0]
  }
}

export function getName({ book, lang }) {
  return getArrayValue({ book, lang, property: "names" })
}

export function getAbbreviation({ book, lang }) {
  return getArrayValue({ book, lang, property: "abbr" })
}

export function addNames({
  lang,
  bookList,
  namesData,
  abbreviationsData
}) {
  for (let bookIndex = 0; bookIndex < bookList.length; bookIndex++) {
    const usfm = bookList[bookIndex]
    const bookInfo = BIBLE_DATA[usfm]
    let names = namesData[bookIndex]
    let abbreviations = abbreviationsData[bookIndex]

    if (isNotEmpty(bookInfo)) {
      if (typeof names === "string") {
        names = [names]
      }

      if (isEmpty(bookInfo.names[lang])) {
        bookInfo.names[lang] = []
      }

      bookInfo.names[lang].splice(bookInfo.names[lang].length - 1, 0, names)

      if (isEmpty(bookInfo.abbr[lang])) {
        bookInfo.abbr[lang] = []
      }

      if (isNotEmpty(abbreviations)) {
        if (typeof abbreviations === "string") {
          abbreviations = [abbreviations]
        }

        bookInfo.abbr[lang].splice(bookInfo.abbr[lang].length - 1, 0, abbreviations)
      } else {
        for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
          const name = names[nameIndex]
          const abbreviation = name.substr(0, Math.min(name.length, 4))

          bookInfo.abbr[lang].push(abbreviation)
        }
      }
    }
  }
}

export function newReadingPlanDefaultConfiguration() {
  return {
    lang: "en",
    order: "traditional",
    startDate: new Date(),
    numberOfDays: 365,
    bookList: [...DEFAULT_BOOK_LIST],
    daysOfTheWeek: [0, 1, 2, 3, 4, 5, 6],
    dailyPsalm: false,
    dailyProverb: false,
    combineOldAndNewTestaments: false,
    logic: "chapters"
  }
}

export function calculateReadingDaysInPlan({
  startDate,
  numberOfDays,
  daysOfTheWeek
}) {
  let readingDays = 0

  for (let i = 0; i < numberOfDays; i++) {
    const date = startDate.addDays(i)

    if (daysOfTheWeek.indexOf(date.getDay()) > -1) {
      readingDays = readingDays + 1
    }
  }

  return readingDays
}

function generateChapterGroup() {
  return {
    name: "default",
    // totals/stats
    chapters: [],
    totalBooks: 0,
    totalChapters: 0,
    totalVerses: 0,
    totalWords: 0,
    chaptersPerDay: 0,
    versesPerDay: 0,
    wordsPerDay: 0,
    // for daily iterations
    chaptersRemaining: 0,
    wordsRemaining: 0,
    firstDayWithReadingHasPassed: false,
    currentBookIndex: 0,
    currentBookUsFm: null,
    currentChapterNumber: -1,
    chapterIndex: 0
  }
}

function generateThematicPlanChapterGroups() {}

function generateChronologicalPlanChapterGroups() {}

function generateMcheynePlanChapterGroups() {}

export function generateTraditionalPlanChapterGroups({
  bookList,
  combineOldAndNewTestaments
}) {
  const chapterGroups = [
    generateChapterGroup()
  ]

  if (combineOldAndNewTestaments) {
    let hasNewTestament = false
    let hasOldTestament = false

    for (const usfm of bookList) {
      if (NEW_TESTAMENT_BOOKS.includes(usfm)) {
        hasNewTestament = true
      }

      if (OLD_TESTAMENT_BOOKS.includes(usfm)) {
        hasOldTestament = true
      }
    }

    if (hasOldTestament && hasNewTestament) {
      chapterGroups.push(generateChapterGroup())

      chapterGroups[0].name = "OT"
      chapterGroups[1].name = "NT"
    }
  }

  for (const usfm of bookList) {
    const bookInfo = BIBLE_DATA[usfm]
    let chapterGroup = null

    // find the correct group to add this chapter to
    if (
      combineOldAndNewTestaments &&
      NEW_TESTAMENT_BOOKS.includes(usfm) &&
      chapterGroups.length > 1
    ) {
      chapterGroup = chapterGroups[1]
    } else {
      chapterGroup = chapterGroups[0]
    }

    // chapters
    for (let ci = 0; ci < bookInfo.chapters.length; ci++) {
      chapterGroup.chapters.push(`${usfm}_${ci + 1}`)
    }
  }

  return chapterGroups
}

export function generateChapterGroupsForPlanType({
  order,
  combineOldAndNewTestaments,
  bookList,
  readingDays
}) {
  const planTypeMap = {
    traditional: generateTraditionalPlanChapterGroups,
    chronological: generateChronologicalPlanChapterGroups,
    mcheyne: generateMcheynePlanChapterGroups,
    thematic: generateThematicPlanChapterGroups
  }

  const chapterGroups = planTypeMap[order]({
    bookList,
    combineOldAndNewTestaments
  })

  // calculate totals
  chapterGroups.forEach(chapterGroup => {
    const { chapters } = chapterGroup
    chapters.forEach(chapterCode => {
      if (chapterCode) {
        const [usfm, chapterNumber] = chapterCode.split("_")
        const numericChapterNumber = parseInt(chapterNumber, 10)
        const bookInfo = BIBLE_DATA[usfm]

        // sum the verses and words for the chapter group
        chapterGroup.totalVerses += bookInfo.chapters[numericChapterNumber - 1]
        chapterGroup.totalWords += bookInfo.words ? bookInfo.words[numericChapterNumber - 1] : 500
      } else {
        debugger // what's this about??
      }
    })

    // full totals
    chapterGroup.totalChapters = chapterGroup.chapters.length
    chapterGroup.chaptersPerDay = chapterGroup.totalChapters / readingDays
    chapterGroup.versesPerDay = chapterGroup.totalVerses / readingDays
    chapterGroup.wordsPerDay = chapterGroup.totalWords / readingDays
  })
}

export function generateDayReadingInfo({ day, date }) {
  return {
    day,
    date,
    chapterGroups: [],
    chapters: [],
    formattedReading: "",
    wordsForToday: 0,
    versesForToday: 0
  }
}

export function formatChapterRange({ lang, chapters, isFullName = false }) {
  // ?? isFullName doesn't appear to actually be used for anything?
  if (isEmpty(chapters)) {
    return ""
  }

  let formatted = ""
  let previousBookUsfm = ""
  let previousChapterNumber = 0
  let previousChapterWasRange = false
  let firstChapterOfBook = 0

  for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
    const { usfm, chapter } = chapters[chapterIndex]
    const bookInfo = BIBLE_DATA[usfm]

    // new book
    if (usfm !== previousBookUsfm) {
      // past the first entry for this day
      if (chapterIndex > 0) {
        if (firstChapterOfBook !== previousChapterNumber) {
          formatted += `-${previousChapterNumber.toString()}`
        }

        formatted += "; "
      }

      // start with the book name/abbr
      formatted += getAbbreviation({ book: bookInfo, lang })

      // add the first chapter (unless it's a single chapter book)
      if (bookInfo.chapters.length > 1) {
        formatted += ` ${chapter}`
      }

      // store the first chapter we're using
      firstChapterOfBook = chapter
    } else {
      // check that it's in sequence
      if (chapter - 1 === previousChapterNumber) {
        // same book, but last entry
        if (chapterIndex === chapters.length - 1) {
          formatted += `-${chapter.toString()}`
          previousChapterWasRange = false
        } else {
          // wait for next one
          previousChapterWasRange = true
        }
      } else {
        if (previousChapterWasRange) {
          formatted += `-${previousChapterNumber.toString()}`
        }

        formatted += `, ${chapter.toString()}`
        previousChapterWasRange = false
      }
    }

    previousChapterNumber = chapter
    previousBookUsfm = usfm
  }

  return formatted
}

export function generateDaysForPlan({
  startDate,
  numberOfDays,
  chapterGroups,
  daysOfTheWeek,
  dailyPsalm,
  dailyProverb,
  logic,
  lang
}) {
  const readingPlanDays = []
  const psalmMax = 150
  const proverbMax = 31
  let date = startDate
  let psalmNumber = 1
  let proverbNumber = 1
  let rangeIncludesPsalm = false
  let rangeIncludesProverb = false
  let ended = false // this doesn't appear to be changed ever, and is only used in one place, is it even needed??

  for (let dayIndex = 0; dayIndex <= numberOfDays && !ended; dayIndex++) {
    const dayInfo = generateDayReadingInfo({ day: dayIndex, date })
    readingPlanDays.push(dayInfo)

    chapterGroups.forEach(() => {
      dayInfo.chapterGroups.push({
        wordsForToday: 0,
        versesForToday: 0,
        chapters: []
      })
    })

    // iterate the date here, because we'll skip days below
    date = date.incrementDay()

    // skip unused days
    if (!daysOfTheWeek.includes(date.getDay())) {
      continue
    }

    const logicMap = {
      chapters() {
        chapterGroups.forEach((chapterGroup, chapterGroupIndex) => {
          let { chapterIndex } = chapterGroup
          const { chapters, chaptersPerDay, chaptersRemaining } = chapterGroup
          const dayChapterGroup = dayInfo.chapterGroups[chapterGroupIndex]
          let chaptersForCurrentDay = chaptersPerDay + chaptersRemaining

          if (dayIndex === 1 && chaptersForCurrentDay < 1) {
            chaptersForCurrentDay = 1
          }

          if (dayIndex === numberOfDays) {
            chaptersForCurrentDay = chapters.length - chapterIndex + 1
          }

          while (chaptersForCurrentDay >= 1 && chapterIndex < chapters.length) {
            const chapterCode = chapters[chapterIndex]
            const [usfm, chapterNumber] = chapterCode.split("_")
            const numericChapterNumber = parseInt(chapterNumber, 10)
            const bookInfo = BIBLE_DATA[usfm]

            chapterGroup.currentBookUsfm = usfm
            chapterGroup.currentChapterNumber = numericChapterNumber

            dayChapterGroup.chapters.push({
              usfm,
              chapter: numericChapterNumber
            })
            dayChapterGroup.versesForToday += bookInfo.chapters[numericChapterNumber - 1]
            dayChapterGroup.wordsForToday += bookInfo.words ? bookInfo.words[numericChapterNumber - 1] : 500

            chaptersForCurrentDay = chaptersForCurrentDay - 1
            chapterIndex = chapterIndex + 1
          }

          chapterGroup.chaptersRemaining = chaptersForCurrentDay
        })
      },

      words() {
        chapterGroups.forEach((chapterGroup, chapterGroupIndex) => {
          let { chapterIndex, firstDayWithReadingHasPassed } = chapterGroup
          const { chapters, wordsPerDay, wordsRemaining } = chapterGroup
          const dayChapterGroup = dayInfo.chapterGroups[chapterGroupIndex]
          let wordsForCurrentDay = wordsPerDay + wordsRemaining

          if (dayIndex === numberOfDays) {
            wordsForCurrentDay = 10000000 // temp: just a big number
          }

          while (wordsForCurrentDay >= 0 && chapterIndex < chapters.length) {
            const chapterCode = chapters[chapterIndex]
            const [usfm, chapterNumber] = chapterCode.split("_")
            const numericChapterNumber = parseInt(chapterNumber, 10)
            const bookInfo = BIBLE_DATA[usfm]

            // check if the number of words is more or less than half of what's left
            const wordsInChapter = bookInfo.words ? bookInfo.words[numericChapterNumber - 1] : 500

            if (wordsInChapter / 2 > wordsForCurrentDay && firstDayWithReadingHasPassed) {
              break
            }

            firstDayWithReadingHasPassed = true

            dayChapterGroup.chapters.push({
              usfm,
              chapter: numericChapterNumber
            })
            dayChapterGroup.versesForToday += bookInfo.chapters[numericChapterNumber - 1]
            dayChapterGroup.wordsForToday += wordsInChapter

            wordsForCurrentDay = wordsForCurrentDay - wordsInChapter
            chapterIndex = chapterIndex + 1
          }

          chapterGroup.wordsRemaining = wordsForCurrentDay
        })
      }
    }

    logicMap[logic]()

    dayInfo.chapterGroups.forEach(({ wordsForToday, versesForToday, chapters }) => {
      dayInfo.wordsForToday += wordsForToday
      dayInfo.versesForToday += versesForToday
      dayInfo.chapters = dayInfo.chapters.concat(...chapters)
    })

    dayInfo.formattedReading = formatChapterRange({ lang, chapters: dayInfo.chapters })

    for (const { usfm } of dayInfo.chapters) {
      if (!rangeIncludesPsalm && usfm === "PSA") {
        rangeIncludesPsalm = true
      }

      if (!rangeIncludesProverb && usfm === "PRO") {
        rangeIncludesProverb = true
      }
    }

    if (dailyPsalm && !rangeIncludesPsalm) {
      dayInfo.formattedReading += `; Ps ${psalmNumber}`
      psalmNumber = psalmNumber + 1

      if (psalmNumber > psalmMax) {
        psalmNumber = 1
      }
    }

    if (dailyProverb && !rangeIncludesProverb) {
      dayInfo.formattedReading += `; Pro ${proverbNumber}`
      proverbNumber = proverbNumber + 1

      if (proverbNumber > proverbMax) {
        proverbNumber = 1
      }
    }
  }

  return readingPlanDays
}

export function generateReadingPlan({
  lang,
  order,
  startDate,
  numberOfDays,
  bookList,
  daysOfTheWeek,
  dailyPsalm,
  dailyProverb,
  combineOldAndNewTestaments,
  logic
}) {
  enhanceDatePrototype()

  const readingDays = calculateReadingDaysInPlan({
    startDate,
    numberOfDays,
    daysOfTheWeek
  })

  const chapterGroups = generateChapterGroupsForPlanType({
    order,
    bookList,
    combineOldAndNewTestaments,
    readingDays
  })

  const days = generateDaysForPlan({
    startDate,
    numberOfDays,
    chapterGroups,
    daysOfTheWeek,
    dailyPsalm,
    dailyProverb,
    logic,
    lang
  })

  let readingPlan = {
    startDate,
    numberOfDays,
    bookList,
    daysOfTheWeek,
    readingDays,
    chapterGroups,
    days
  }

  restoreDatePrototype()

  return readingPlan
}
