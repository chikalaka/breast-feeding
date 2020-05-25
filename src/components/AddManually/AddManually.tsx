// @ts-nocheck
import React, { ReactNode, useEffect, useState } from "react"
import styles from "./AddManually.module.css"
import { DialogTitle, DiaperingLog, Log } from "../../types/common"
import moment, { Moment } from "moment"
import AddButton from "../AddButton/AddButton"
import AddDialog from "../AddDialog/AddDialog"
import DurationPicker from "../DurationPicker/DurationPicker"

type AddManuallyProps = {
  addLog: (log: Log) => void
  title: DialogTitle
  children?: ReactNode
  addTitle?: string
  buttonProps?: any
}

const AddManually = ({
  addTitle,
  buttonProps,
  addLog,
  title,
  children
}: AddManuallyProps) => {
  const [log, setLog] = useState<Partial<Log>>({
    finishTime: moment().toISOString()
  })

  const handleDateChange = (date: Moment) => {
    setLog(log => ({ ...log, finishTime: date.toISOString() }))
  }

  const [open, setOpen] = useState(false)
  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  useEffect(() => {
    if (open) handleDateChange(moment())
  }, [open])

  const onSave = () => {
    const newLog: Log = { ...log }
    if (title === "Poo") {
      newLog.type = "diapering"
      newLog.isPoo = true
    }
    if (title === "Pee") {
      newLog.isPee = true
      newLog.type = "diapering"
    }
    if (title === "Pee & Poo") {
      newLog.type = "diapering"
      newLog.isPee = true
      newLog.isPoo = true
    }
    if (title === "Left") {
      newLog.isRight = false
      newLog.type = "feeding"
    }
    if (title === "Right") {
      newLog.isRight = true
      newLog.type = "feeding"
    }
    if (title === "Weight") {
      newLog.type = "weight"
    }
    addLog(newLog)
    closeDialog()
  }

  return (
    <>
      <AddButton {...buttonProps} addTitle={addTitle} onClick={openDialog} />
      <AddDialog
        onSave={onSave}
        onDateChange={handleDateChange}
        finishTimeValue={log.finishTime}
        title={title}
        open={open}
        onClose={closeDialog}
      >
        {children}
      </AddDialog>
    </>
  )
}

export default AddManually
