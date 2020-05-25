export type LogType = "diapering" | "feeding" | "weight"
export type DialogTitle =
  | "Right"
  | "Left"
  | "Pee & Poo"
  | "Pee"
  | "Poo"
  | "Weight"

type BaseLog = {
  type: LogType
  finishTime: string
  id: string
}

export type FeedingLog = {
  isRight: boolean
  duration: number
} & BaseLog

export type DiaperingLog = {
  isPee: boolean
  isPoo: boolean
} & BaseLog

export type WeightingLog = {
  weight: number
} & BaseLog

export type Log = FeedingLog | DiaperingLog | WeightingLog
