import React from "react"
import { FeedingLog } from "../../types/common"
import moment from "moment"
import { useSettings } from "../../helpers/hooks"
import styles from "./NextBreast.module.css"
import { getBreastSide } from "../../helpers/helpers"
import Button from "../Button/Button"

type NextBreastProps = {
  feedingLogs: Array<FeedingLog>
  onStart: (isRight: boolean) => void
}

const NextBreast = ({ feedingLogs, onStart }: NextBreastProps) => {
  const { calculateFromDuration } = useSettings()
  console.log("calculateFromDuration.value", calculateFromDuration.value)

  const relevantLogs = feedingLogs.filter(log => {
    const start = moment(log.finishTime)
    const end = moment(moment().toISOString())

    const diffDuration = moment.duration(end.diff(start))
    const diffInHours = diffDuration.asHours()

    return diffInHours < calculateFromDuration.value
  })
  console.log("relevantLogs", relevantLogs)

  const rightDuration = relevantLogs.reduce(
    (acc, curr) => (curr.isRight ? acc + curr.duration : acc),
    0
  )
  const leftDuration = relevantLogs.reduce(
    (acc, curr) => (!curr.isRight ? acc + curr.duration : acc),
    0
  )
  const isRightNext = leftDuration > rightDuration
  return (
    <div className={styles.container}>
      <div className={styles.next}>next:</div>
      <Button className={styles.side} onClick={() => onStart(isRightNext)}>
        {getBreastSide(isRightNext)}
      </Button>
    </div>
  )
}

export default NextBreast
