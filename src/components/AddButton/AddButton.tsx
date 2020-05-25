import React from "react"
import Button from "../Button/Button"
import { Icon } from "@material-ui/core"

const AddButton = ({ ...props }) => {
  return (
    <Button
      style={{
        textTransform: "inherit",
        width: "fit-content",
        marginTop: 5,
        padding: "4px 10px",
        fontSize: 13
      }}
      {...props}
      startIcon={<Icon>add</Icon>}
    >
      Add {props.addTitle}
    </Button>
  )
}

export default AddButton
