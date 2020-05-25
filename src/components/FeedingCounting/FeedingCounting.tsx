import React, { useRef, useState } from "react"
import styles from "./FeedingCounting.module.css"
import { useInterval } from "../../helpers/hooks"
import moment from "moment"
import { getBreastSide } from "../../helpers/helpers"
import { FeedingLog } from "../../types/common"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import Button from "../Button/Button"

type FeedingCounting = {
  isRight: boolean
  onFinish: (feedingLog: Partial<FeedingLog>) => void
  onDelete: () => void
}
const FeedingCounting = ({
  isRight,
  onDelete = () => {},
  onFinish = () => {}
}: FeedingCounting) => {
  const startTime = useRef(moment().toISOString())
  const [duration, setDuration] = useState<number>(0)
  useInterval({
    callback: () => {
      const diffDuration = moment.duration(
        moment(moment().toISOString()).diff(moment(startTime.current))
      )
      const diffInSec = diffDuration.asSeconds()
      setDuration(diffInSec)
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.timeContainer}>
        <div>{getBreastSide(isRight)}</div>
        {moment.duration(duration, "seconds").format("mm:ss")}
        <IconButton onClick={onDelete}>
          <Icon>delete</Icon>
        </IconButton>
      </div>
      <Button
        className={styles.button}
        onClick={() =>
          onFinish({
            duration,
            isRight,
            type: "feeding",
            finishTime: moment().toISOString()
          })
        }
      >
        Finish
      </Button>
    </div>
  )
}

export default FeedingCounting
