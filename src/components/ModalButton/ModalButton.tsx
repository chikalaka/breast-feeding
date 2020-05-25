import { Modal } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import Button from "../Button/Button"
import React, { ReactNode, useState } from "react"
import styles from "./ModalButton.module.css"

type ModalButtonProps = {
  button?: ReactNode
  buttonTitle?: ReactNode
  children: ReactNode
  buttonClassName?: string
}

const ModalButton = ({
  button,
  buttonTitle,
  children,
  buttonClassName
}: ModalButtonProps) => {
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  return (
    <>
      {button ? (
        <div className={buttonClassName} onClick={openModal}>
          {button}
        </div>
      ) : (
        <Button onClick={openModal}>{buttonTitle}</Button>
      )}
      <Modal className={styles.modal} open={open} onClose={closeModal}>
        <div className={styles.content}>
          <IconButton className={styles.icon} onClick={closeModal}>
            <Icon>close</Icon>
          </IconButton>
          {children}
        </div>
      </Modal>
    </>
  )
}

export default ModalButton
