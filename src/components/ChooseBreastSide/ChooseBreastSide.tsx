import React, { useState } from "react"
import styles from "./ChooseBreastSide.module.css"
import Button from "../Button/Button"
import { FeedingLog } from "../../types/common"
import moment from "moment"
import DurationPicker from "../DurationPicker/DurationPicker"
import AddManually from "../AddManually/AddManually"
import { getBreastSide } from "../../helpers/helpers"

type ChooseBreastSideProps = {
  onStart: (isRight: boolean) => void
  addFeedingLog: (feedingLog: Partial<FeedingLog>) => void
  averageFeedingDuration: number
  lastLog: FeedingLog
}

const ChooseBreastSide = ({
  onStart,
  addFeedingLog,
  averageFeedingDuration,
  lastLog
}: ChooseBreastSideProps) => {
  const [duration, setDuration] = useState(averageFeedingDuration)

  return (
    <div className={styles.container}>
      <Previous lastLog={lastLog} />
      <div className={styles.sides}>
        <div className={styles.sideContainer}>
          <Button className={styles.button} onClick={() => onStart(false)}>
            Left
          </Button>
          <AddManually
            buttonProps={{ className: styles.addButton }}
            title="Left"
            addLog={log => addFeedingLog({ ...log, duration })}
          >
            <div>Duration (min)</div>
            <DurationPicker
              onChange={duration => setDuration(duration * 60)}
              value={Math.round(duration / 60)}
            />
          </AddManually>
        </div>
        <div className={styles.sideContainer}>
          <Button className={styles.button} onClick={() => onStart(true)}>
            Right
          </Button>
          <AddManually
            buttonProps={{ className: styles.addButton }}
            title="Right"
            addLog={log => addFeedingLog({ ...log, duration })}
          >
            <div>Duration (min)</div>
            <DurationPicker
              onChange={duration => setDuration(duration * 60)}
              value={Math.round(duration / 60)}
            />
          </AddManually>
        </div>
      </div>
    </div>
  )
}

const Previous = ({ lastLog }: { lastLog: FeedingLog }) => {
  if (!lastLog) return null

  return (
    <div className={styles.previous}>
      Previous feeding: {getBreastSide(lastLog.isRight)},{" "}
      {Math.round(lastLog.duration / 60)}min
      {", "}
      {moment(lastLog.finishTime).fromNow()}
    </div>
  )
}

export default ChooseBreastSide
