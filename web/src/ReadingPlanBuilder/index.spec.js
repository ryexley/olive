import {
  enhanceDatePrototype,
  restoreDatePrototype,
  getArrayValue,
  getName,
  getAbbreviation,
  addNames,
  newReadingPlanDefaultConfiguration,
  calculateReadingDaysInPlan,
  generateChapterGroup
} from "."

describe("Reading Plan Builder", () => {
  describe("enhanceDatePrototype", () => {
    let testDate = null

    beforeEach(() => {
      enhanceDatePrototype()
      testDate = new Date("2020-04-09T21:08:58.004Z")
    })

    afterEach(() => {
      testDate = null
      restoreDatePrototype()
    })

    it("adds enhancement functions to the Date.prototype", () => {
      expect(testDate).toHaveProperty("addDays")
      expect(typeof testDate.addDays).toEqual("function")

      expect(testDate).toHaveProperty("incrementDay")
      expect(typeof testDate.incrementDay).toEqual("function")

      expect(testDate).toHaveProperty("monthAbbreviation")
      expect(typeof testDate.monthAbbreviation).toEqual("function")

      expect(testDate).toHaveProperty("monthName")
      expect(typeof testDate.monthName).toEqual("function")

      expect(testDate).toHaveProperty("formatted")
      expect(typeof testDate.formatted).toEqual("function")

      expect(testDate).toHaveProperty("toInputField")
      expect(typeof testDate.toInputField).toEqual("function")
    })

    describe("Date.addDays", () => {
      it("should return a date with the given number of days added to the date", () => {
        expect(testDate.addDays(2)).toEqual(new Date("2020-04-11T21:08:58.004Z"))
      })
    })

    describe("Date.incrementDay", () => {
      it("should return a day that is one day ahead from the current date", () => {
        expect(testDate.incrementDay()).toEqual(new Date("2020-04-10T21:08:58.004Z"))
      })
    })

    describe("Date.monthAbbreviation", () => {
      it("should return the month abbreviation for the month of the date", () => {
        expect(testDate.monthAbbreviation()).toEqual("Apr")
      })
    })

    describe("Date.monthName", () => {
      it("should return the full month name for the date", () => {
        expect(testDate.monthName()).toEqual("April")
      })
    })

    describe("Date.formatted", () => {
      it("should return the date formatted as YYYY/MM/DD", () => {
        expect(testDate.formatted()).toEqual("2020/4/9")
      })
    })

    describe("Date.toInputField", () => {
      it("should return the date formatted as YYYY-MM-DD", () => {
        expect(testDate.toInputField()).toEqual("2020-04-09")
      })

      describe("for double-digit months and days", () => {
        it("should return the date formatted as YYYY-MM-DD", () => {
          testDate = new Date("2020-11-17T21:08:58.004Z")
          expect(testDate.toInputField()).toEqual("2020-11-17")
        })
      })
    })
  })

  describe("getArrayValue", () => {
    it("should return the first value for the given property for the given language on the given target", () => {
      const target = { abbr: { sv: ["1 Mos"] } }
      expect(getArrayValue({ target, lang: "sv", property: "abbr" })).toEqual("1 Mos")
    })

    describe("when the given target object is empty", () => {
      it("should return an empty string", () => {
        expect(getArrayValue({ target: null, lang: "en" })).toEqual("")
      })
    })

    describe("when the given property on the given object is empty", () => {
      it("should return an empty string", () => {
        const target = { foo: "bar" }
        expect(getArrayValue({ target, lang: "en", property: "test" })).toEqual("")
      })
    })

    describe("when the given language key doesn't exist on the given property on the given object", () => {
      it("should return the value for the \"en\" language", () => {
        const target = { abbr: { en: ["Gen"] } }
        expect(getArrayValue({ target, lang: "fr", property: "abbr" })).toEqual("Gen")
      })
    })
  })

  describe("getName", () => {
    it("should return the correct name for the given book and lang", () => {
      const book = { names: { en: ["Genesis" ], sv: ["Första Moseboken"] } }
      expect(getName({ book, lang: "sv" })).toEqual("Första Moseboken")
    })
  })

  describe("getAbbreviation", () => {
    it("should return the correct abbreviation for the given book and lang", () => {
      const book = { abbr: { en: ["Genesis" ], es: ["Géne"] } }
      expect(getAbbreviation({ book, lang: "es" })).toEqual("Géne")
    })
  })

  describe.skip("addNames", () => {})

  describe("newReadingPlanDefaultConfiguration", () => {
    it("should return the correct default reading plan configuration", () => {
      expect(newReadingPlanDefaultConfiguration()).toEqual({
        lang: "en",
        order: "traditional",
        startDate: new Date(),
        numberOfDays: 365,
        bookList: [
          "GEN",
          "EXO",
          "LEV",
          "NUM",
          "DEU",
          "JOS",
          "JDG",
          "RUT",
          "1SA",
          "2SA",
          "1KI",
          "2KI",
          "1CH",
          "2CH",
          "EZR",
          "NEH",
          "EST",
          "JOB",
          "PSA",
          "PRO",
          "ECC",
          "SNG",
          "ISA",
          "JER",
          "LAM",
          "EZK",
          "DAN",
          "HOS",
          "JOL",
          "AMO",
          "OBA",
          "JON",
          "MIC",
          "NAM",
          "HAB",
          "ZEP",
          "HAG",
          "ZEC",
          "MAL",
          "MAT",
          "MRK",
          "LUK",
          "JHN",
          "ACT",
          "ROM",
          "1CO",
          "2CO",
          "GAL",
          "EPH",
          "PHP",
          "COL",
          "1TH",
          "2TH",
          "1TI",
          "2TI",
          "TIT",
          "PHM",
          "HEB",
          "JAS",
          "1PE",
          "2PE",
          "1JN",
          "2JN",
          "3JN",
          "JUD",
          "REV"
        ],
        daysOfTheWeek: [0, 1, 2, 3, 4, 5, 6],
        dailyPsalm: false,
        dailyProverb: false,
        combineOldAndNewTestaments: false,
        logic: "chapters"
      })
    })
  })

  describe("calculateReadingDaysInPlan", () => {
    beforeEach(() => {
      enhanceDatePrototype()
    })

    afterEach(() => {
      restoreDatePrototype()
    })

    it("should return the correct number of reading days for the given args", () => {
      let args = {
        startDate: new Date("2020-01-01T21:08:58.004Z"),
        numberOfDays: 365,
        daysOfTheWeek: [0, 1, 2, 3, 4, 5, 6]
      }

      expect(calculateReadingDaysInPlan(args)).toEqual(365)

      args = {
        startDate: new Date("2020-01-01T21:08:58.004Z"),
        numberOfDays: 30,
        daysOfTheWeek: [0, 1, 2, 3, 4, 5, 6]
      }

      expect(calculateReadingDaysInPlan(args)).toEqual(30)

      args = {
        startDate: new Date("2020-01-01T21:08:58.004Z"),
        numberOfDays: 30,
        daysOfTheWeek: [1, 2, 3, 4, 5]
      }

      expect(calculateReadingDaysInPlan(args)).toEqual(22)

      args = {
        startDate: new Date("2020-04-05T21:08:58.004Z"),
        numberOfDays: 30,
        daysOfTheWeek: [1, 2, 3, 4, 5]
      }

      expect(calculateReadingDaysInPlan(args)).toEqual(21)

      args = {
        startDate: new Date("2020-04-05T21:08:58.004Z"),
        numberOfDays: 90,
        daysOfTheWeek: [1, 2, 4, 5]
      }

      expect(calculateReadingDaysInPlan(args)).toEqual(52)
    })
  })

  describe("generateChapterGroup", () => {
    it("should return the correct chapter group object", () => {
      expect(generateChapterGroup()).toEqual({
        name: "default",
        chapters: [],
        totalBooks: 0,
        totalChapters: 0,
        totalVerses: 0,
        totalWords: 0,
        chaptersPerDay: 0,
        versesPerDay: 0,
        wordsPerDay: 0,
        chaptersRemaining: 0,
        wordsRemaining: 0,
        firstDayWithReadingHasPassed: false,
        currentBookIndex: 0,
        currentBookUsFm: null,
        currentChapterNumber: -1,
        chapterIndex: 0
      })
    })
  })
})
