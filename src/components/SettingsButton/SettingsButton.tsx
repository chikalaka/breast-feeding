import React, { useState } from "react"
import styles from "./SettingsButton.module.css"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import { useSettings } from "../../helpers/hooks"
import DurationPicker from "../DurationPicker/DurationPicker"
import ModalButton from "../ModalButton/ModalButton"

const SettingsButton = () => {
  const { calculateFromDuration, minimumFeedingDuration } = useSettings()

  return (
    <ModalButton
      buttonClassName={styles.button}
      button={
        <div>
          <IconButton>
            <Icon>settings</Icon>
          </IconButton>
          Settings
        </div>
      }
    >
      <div>
        <div className={styles.set}>
          <div>Calculate next breast based on last # of hours:</div>
          <DurationPicker
            // @ts-ignore
            onChange={calculateFromDuration.setValue}
            // @ts-ignore
            value={calculateFromDuration.value}
          />
        </div>
        <div className={styles.set}>
          <div>Minimum feeding duration (sec):</div>
          <DurationPicker
            // @ts-ignore
            onChange={minimumFeedingDuration.setValue}
            // @ts-ignore
            value={minimumFeedingDuration.value}
          />
        </div>
      </div>
    </ModalButton>
  )
}

export default SettingsButton
