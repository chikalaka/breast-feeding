import React, { useState } from "react"
import styles from "./Weighting.module.css"
import { FeedingLog, WeightingLog } from "../../types/common"
import { getWeightInKg } from "../../helpers/helpers"
import moment from "moment"
import DurationPicker from "../DurationPicker/DurationPicker"
import AddManually from "../AddManually/AddManually"

type WeightingProps = {
  lastLog: WeightingLog
  addWeightingLog: (weightingLog: Partial<WeightingLog>) => void
}

const Weighting = ({ lastLog, addWeightingLog }: WeightingProps) => {
  const lastWeight = lastLog?.weight ?? 4
  const [kilos, setKilos] = useState(Number((lastWeight + "").split(".")[0]))
  const [grams, setGrams] = useState(
    Number((lastWeight + "").split(".")[1] ?? 0)
  )
  return (
    <div className={styles.container}>
      <Previous lastLog={lastLog} />
      <AddManually
        title="Weight"
        addLog={log =>
          addWeightingLog({ ...log, weight: Number(kilos + grams / 10) })
        }
        addTitle="weight"
      >
        <div>Weight (Kg)</div>
        <div className={styles.pickers}>
          <DurationPicker onChange={setKilos} value={kilos} />
          <div>.</div>
          <DurationPicker onChange={setGrams} value={grams} />
        </div>
      </AddManually>
    </div>
  )
}

const Previous = ({ lastLog }: { lastLog: WeightingLog }) => {
  if (!lastLog) return null

  return (
    <div className={styles.previous}>
      Previous weighting: {getWeightInKg(lastLog.weight)}
      {", "}
      {moment(lastLog.finishTime).fromNow()}
    </div>
  )
}

export default Weighting
