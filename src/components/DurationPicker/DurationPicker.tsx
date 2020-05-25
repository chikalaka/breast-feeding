import React, { useState } from "react"
import styles from "./DurationPicker.module.css"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"

type DurationPickerProps = {
  onChange: (number: number) => void
  value: number
}

const DurationPicker = ({ onChange, value }: DurationPickerProps) => {
  const [number, setNumber] = useState<number>(value)
  const increment = () => {
    onChange(number + 1)
    setNumber(n => n + 1)
  }
  const decrement = () => {
    onChange(number - 1)
    setNumber(n => n - 1)
  }

  return (
    <div className={styles.container}>
      <IconButton onClick={increment}>
        <Icon>keyboard_arrow_up_icon</Icon>
      </IconButton>
      <div>{number}</div>
      <IconButton onClick={decrement}>
        <Icon>keyboard_arrow_down_icon</Icon>
      </IconButton>
    </div>
  )
}

export default DurationPicker
