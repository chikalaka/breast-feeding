import React, { ReactNode } from "react"
import styles from "./AddDialog.module.css"
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers"
import Button from "../Button/Button"
import Dialog from "@material-ui/core/Dialog"
import { Log } from "../../types/common"

type AddDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (log: Log) => void
  title: string
  onDateChange: (date: any) => void
  finishTimeValue: number
  children: ReactNode
}

const AddDialog = ({
  open,
  onClose,
  title,
  onDateChange,
  finishTimeValue,
  onSave,
  children
}: AddDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {children}
        <div>Date</div>
        <KeyboardDatePicker
          margin="normal"
          format="DD/MM"
          value={finishTimeValue}
          onChange={onDateChange}
        />
        <div>Finish time</div>
        <KeyboardTimePicker
          margin="normal"
          value={finishTimeValue}
          onChange={onDateChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog
