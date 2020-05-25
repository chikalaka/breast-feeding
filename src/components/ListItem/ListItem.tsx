import React, { ReactNode, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import styles from "./ListItem.module.css"

export type ListItemProps = {
  bullet: ReactNode
  content: ReactNode
  classes?: {
    container?: string
    bullet?: string
    content?: string
    bulletBorder?: string
  }
}

const ListItem = ({ classes, bullet, content }: ListItemProps) => {
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    // @ts-ignore
    setHeight(ref.current.clientHeight)
  })

  return (
    <div
      ref={ref}
      className={classNames(styles.itemContainer, classes?.container)}
    >
      <div
        style={{ width: height }}
        className={classNames(styles.bullet, classes?.bullet)}
      >
        <div
          style={{ width: height, height: height }}
          className={classNames(styles.bulletBorder, classes?.bulletBorder)}
        />
        {bullet}
      </div>
      <div className={classNames(classes?.content)}>{content}</div>
    </div>
  )
}

export default ListItem
