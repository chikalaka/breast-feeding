import React from "react"
import styles from "./Button.module.css"
import MuiButton from "@material-ui/core/Button"

const Button = ({ ...props }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      {...props}
      className={`${styles.button} ${props.className}`}
    />
  )
}

export default Button
