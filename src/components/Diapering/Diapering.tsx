import React from "react"
import styles from "./Diapering.module.css"
import { DiaperingLog } from "../../types/common"
import moment from "moment"
import { getDiaperingText } from "../../helpers/helpers"
import Button from "../Button/Button"
import AddManually from "../AddManually/AddManually"

type DiaperingProps = {
  lastLog: DiaperingLog
  onStart: ({ isPee, isPoo }: { isPee: boolean; isPoo: boolean }) => void
  addDiaperingLog: (diaperingLog: Partial<DiaperingLog>) => void
}
const Diapering = ({ lastLog, onStart, addDiaperingLog }: DiaperingProps) => {
  return (
    <div className={styles.container}>
      <Previous lastLog={lastLog} />
      <div className={styles.types}>
        <div>
          <Button onClick={() => onStart({ isPee: true, isPoo: true })}>
            Pee & Poo
          </Button>
          <AddManually
            buttonProps={{ className: styles.addButton }}
            title="Pee & Poo"
            addLog={addDiaperingLog}
          />
        </div>
        <div>
          <Button onClick={() => onStart({ isPee: true, isPoo: false })}>
            Pee
          </Button>
          <AddManually
            buttonProps={{ className: styles.addButton }}
            title="Pee"
            addLog={addDiaperingLog}
          />
        </div>
        <div>
          <Button onClick={() => onStart({ isPee: false, isPoo: true })}>
            Poo
          </Button>
          <AddManually
            buttonProps={{ className: styles.addButton }}
            title="Poo"
            addLog={addDiaperingLog}
          />
        </div>
      </div>
    </div>
  )
}

const Previous = ({ lastLog }: { lastLog: DiaperingLog }) => {
  if (!lastLog) return null

  return (
    <div className={styles.previous}>
      Previous diapering:{" "}
      {getDiaperingText({ isPee: lastLog.isPee, isPoo: lastLog.isPoo })}
      {", "}
      {moment(lastLog.finishTime).fromNow()}
    </div>
  )
}

export default Diapering
