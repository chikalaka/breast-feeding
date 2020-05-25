import React, { ReactNode } from "react"
import styles from "./Card.module.css"
import cn from "classnames"

type CardProps = {
  className?: string
  children: ReactNode
}

const Card = ({ className, children }: CardProps) => (
  <div className={cn(styles.container, className)}>{children}</div>
)

export default Card
