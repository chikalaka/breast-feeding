import React, { useState } from "react"
import NextBreast from "../../components/NextBreast/NextBreast"
import { useLogs, useRerender, useSettings } from "../../helpers/hooks"
import moment from "moment"
import { DiaperingLog, FeedingLog, Log, WeightingLog } from "../../types/common"
import FeedingCounting from "../../components/FeedingCounting/FeedingCounting"
import { v4 as uuidv4 } from "uuid"
import styles from "./HomePage.module.css"
import ChooseBreastSide from "../../components/ChooseBreastSide/ChooseBreastSide"
import {
  filterByType,
  getDailyLogs,
  getFeedingIntervals,
  getFormattedDuration
} from "../../helpers/helpers"
import Diapering from "../../components/Diapering/Diapering"
import Weighting from "../../components/Weighting/Weighting"
import _ from "lodash"
import Logs from "../../components/Logs/Logs"
import SettingsButton from "../../components/SettingsButton/SettingsButton"
import FeedingGraph from "../../components/FeedingGraph/FeedingGraph"
import ModalButton from "../../components/ModalButton/ModalButton"
import DiaperingGraph from "../../components/DiaperingGraph/DiaperingGraph"
import Card from "../../components/Card/Card"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"

const HomePage = () => {
  useRerender(1000)
  // @ts-ignore
  const [logs, setLogs]: [
    Array<Log>,
    (logs: Array<Log>) => void | ((l: Array<Log>) => Array<Log>)
  ] = useLogs()

  console.log("logs", logs)

  const { minimumFeedingDuration } = useSettings()

  const addFeedingLog = (feedingLog: Partial<FeedingLog>) => {
    // @ts-ignore
    if (feedingLog.duration > minimumFeedingDuration.value) {
      setLogs([
        ...logs,
        {
          id: uuidv4(),
          finishTime: moment().toISOString(),
          type: "feeding",
          duration: 1,
          isRight: false,
          ...feedingLog
        }
      ])
    }
  }

  const addDiaperingLog = (diaperingLog: Partial<DiaperingLog>) =>
    setLogs([
      ...logs,
      {
        id: uuidv4(),
        finishTime: moment().toISOString(),
        type: "diapering",
        isPee: true,
        isPoo: true,
        ...diaperingLog
      }
    ])

  const addWightingLog = (weightLog: Partial<WeightingLog>) =>
    setLogs([
      ...logs,
      {
        id: uuidv4(),
        finishTime: moment().toISOString(),
        type: "weight",
        weight: 3,
        ...weightLog
      }
    ])

  const getLogsByType = filterByType(logs)
  const feedingLogs = getLogsByType("feeding")
  const diaperingLogs = getLogsByType("diapering")
  const weightingLogs = getLogsByType("weight")

  const [{ isCounting, isRight }, setBreastCounting] = useState({
    isCounting: false,
    isRight: false
  })

  const stopCounting = () => setBreastCounting({ isCounting: false, isRight })
  const startCounting = (isRight: boolean) => {
    setBreastCounting({ isCounting: true, isRight })
  }

  const onFeedingCountingFinish = (feedingLog: Partial<FeedingLog>) => {
    stopCounting()
    addFeedingLog(feedingLog)
  }

  const averageFeedingDuration =
    feedingLogs.length > 0
      ? Math.round(
          feedingLogs.reduce((acc, curr) => curr.duration + acc, 0) /
            feedingLogs.length
        )
      : 0

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <ModalButton
          buttonClassName={styles.logsButton}
          button={
            <div>
              <IconButton>
                <Icon>assignment</Icon>
              </IconButton>
              All logs
            </div>
          }
        >
          <Logs logs={logs} />
        </ModalButton>
        <ModalButton
          buttonClassName={styles.statsButton}
          button={
            <div>
              <IconButton>
                <Icon>timeline</Icon>
              </IconButton>
              Statistics
            </div>
          }
        >
          <Card>
            <FeedingGraph feedingLogs={feedingLogs} />
          </Card>
          <Card className={styles.diaperingGraph}>
            <DiaperingGraph diaperingLogs={diaperingLogs} />
          </Card>
        </ModalButton>
        <SettingsButton />
      </div>
      <Card className={""}>
        <NextBreast feedingLogs={feedingLogs} onStart={startCounting} />
      </Card>
      <Card className={""}>
        <div className={styles.feeding}>
          {isCounting ? (
            <FeedingCounting
              onDelete={stopCounting}
              isRight={isRight}
              onFinish={onFeedingCountingFinish}
            />
          ) : (
            <ChooseBreastSide
              averageFeedingDuration={averageFeedingDuration}
              addFeedingLog={addFeedingLog}
              onStart={startCounting}
              lastLog={feedingLogs[0]}
            />
          )}
        </div>
      </Card>
      <Card className={""}>
        <Diapering
          addDiaperingLog={addDiaperingLog}
          lastLog={diaperingLogs[0]}
          onStart={addDiaperingLog}
        />
      </Card>
      <Card className={""}>
        <Weighting
          addWeightingLog={addWightingLog}
          lastLog={weightingLogs[0]}
        />
      </Card>
      <Card className={styles.summary}>
        <div className={styles.summaryTitle}>Daily summary</div>
        <div>
          🍼 Feeding, total of{" "}
          {getFormattedDuration(
            getDailyLogs(feedingLogs).reduce(
              // @ts-ignore
              (acc, curr) => curr.duration + acc,
              0
            )
          )}
        </div>
        <div>
          ⏱️{" "}
          {getFeedingIntervals(feedingLogs)
            .slice(0, 5)
            .map(interval => getFormattedDuration(interval * 60))
            .join(", ")}
        </div>
        <div>💩 Diapering, {getDailyLogs(diaperingLogs).length} times</div>
      </Card>
    </div>
  )
}

export default HomePage
