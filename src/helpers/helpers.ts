import { FeedingLog, Log, LogType } from "../types/common"
import moment from "moment"

export const parseStringToValue = (string: string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return string
  }
}

export const runIfExists = (func: any, ...args: any) =>
  func && typeof func === "function" ? func(...args) : func

export const getFromStorage = (key: string) => {
  const { localStorage } = window
  const str = key && localStorage && localStorage.getItem(key)

  return str && parseStringToValue(str)
}

export const setToStorage = (key: string, val: any, callback: Function) => {
  const { localStorage } = window
  const str = typeof val === "string" ? val : JSON.stringify(val)
  if (key && val && localStorage) localStorage.setItem(key, str)
  else if (key) localStorage.setItem(key, "")
  runIfExists(callback)
}

export const getBreastSide = (isRight: boolean) => (isRight ? "Right" : "Left")
export const getDiaperingText = ({
  isPee,
  isPoo
}: {
  isPee: boolean
  isPoo: boolean
}) => {
  if (isPee && isPoo) return "Pee & Poo"
  if (isPoo) return "Poo"
  if (isPee) return "Pee"
  return "No record"
}
export const getWeightInKg = (weight: number) => `${weight} Kg`

export const filterByType = (array: any[]) => (type: LogType) =>
  array.filter(e => e.type === type)

export const getDailyLogsSum = ({
  logs,
  sum,
  subtract = 0
}: {
  logs: Array<Log>
  sum: (log: Log) => number
  subtract: number
}) => {
  const momentDate = moment().subtract(subtract, "days")
  const dailyLogs = logs.filter(log =>
    moment(log.finishTime).isSame(momentDate, "day")
  )

  const date = momentDate.format("ddd")
  const value = dailyLogs.reduce((acc, curr) => sum(curr) + acc, 0)
  return [value, date]
}

export const getWeeklySum = ({
  logs,
  sum
}: {
  logs: Array<Log>
  sum: (log: Partial<Log>) => number
}) => {
  const subtractDailyLogsSum = (subtract: number) =>
    getDailyLogsSum({ logs, sum, subtract })

  const weeklySum = [...Array(7)].map((v, index) => subtractDailyLogsSum(index))
  return weeklySum.reverse()
}

export const getDailyLogs = (logs: Array<Log>) =>
  logs.filter(log => moment(log.finishTime).isSame(new Date(), "day"))

const getLogStartTime = (feedingLog: FeedingLog) => {
  return moment(feedingLog.finishTime).subtract(feedingLog.duration, "seconds")
}

export const getFeedingIntervals: (
  logs: Array<FeedingLog>
) => Array<number> = feedingLogs => {
  const feedingIntervals: Array<number> = []
  let startTime = moment()
  feedingLogs.forEach(log => {
    const diffDuration = moment.duration(moment(log.finishTime).diff(startTime))
    const diffInMin = Math.abs(diffDuration.asMinutes())

    if (diffInMin > 15) feedingIntervals.push(diffInMin)
    startTime = getLogStartTime(log)
  })

  return feedingIntervals
}

export const getFormattedDuration = (durationInSeconds: number) =>
  `${moment.duration(durationInSeconds, "seconds").format("H:mm")}${
    durationInSeconds > 60 * 60 ? "h" : "min"
  }`
