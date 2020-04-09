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

function calculateReadingDaysInPlan({
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

function generateTraditionalPlanChapterGroups({
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

function generateChapterGroupsForPlanType({
  order,
  combineOldAndNewTestaments,
  bookList
}) {
  const planTypeMap = {
    traditional: generateTraditionalPlanChapterGroups,
    chronological: generateChronologicalPlanChapterGroups,
    mcheyne: generateMcheynePlanChapterGroups,
    thematic: generateThematicPlanChapterGroups
  }

  return planTypeMap[order]()
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
  let psalmNumber = 1
  let psalmMax = 150
  let proverbNumber = 1
  let proverbMax = 31
  let rangeIncludesPsalm = false
  let rangeIncludesProverb = false

  const readingDays = calculateReadingDaysInPlan({
    startDate,
    numberOfDays,
    daysOfTheWeek
  })

  const chapterGroups = generateChapterGroupsForPlanType({
    order,
    bookList,
    combineOldAndNewTestaments
  })

  let readingPlan = {
    startDate,
    numberOfDays,
    bookList,
    daysOfTheWeek,
    readingDays,
    chapterGroups,
    days: []
  }

  return readingPlan
}
