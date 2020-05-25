import React, { ReactNode, useEffect, useRef, useState } from "react"
import styles from "./Logs.module.css"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import {
  filterByType,
  getBreastSide,
  getDiaperingText,
  getWeightInKg
} from "../../helpers/helpers"
import moment from "moment"
import { Log, LogType } from "../../types/common"
import Card from "../Card/Card"
import classNames from "classnames"
import ListItem, { ListItemProps } from "../ListItem/ListItem"

type LogsProps = {
  logs: Array<Log>
}

const Logs = ({ logs }: LogsProps) => {
  const [filter, setFilter] = useState<LogType | null>(null)
  const filteredLogs = filter ? filterByType(logs)(filter) : logs

  const getActiveClass = (type: LogType | null) =>
    filter === type ? styles.active : ""

  return (
    <div>
      <div className={styles.filters}>
        <div className={getActiveClass(null)} onClick={() => setFilter(null)}>
          All
        </div>
        <div
          className={getActiveClass("feeding")}
          onClick={() => setFilter("feeding")}
        >
          Feeding
        </div>
        <div
          className={getActiveClass("diapering")}
          onClick={() => setFilter("diapering")}
        >
          Diapering
        </div>
        <div
          className={getActiveClass("weight")}
          onClick={() => setFilter("weight")}
        >
          Weighting
        </div>
      </div>
      {filteredLogs.map(log => {
        if (log.type === "diapering") {
          return (
            <CustomListItem
              bullet={<div className={styles.pooBullet}>💩</div>}
              content={`${getDiaperingText(log)}, ${moment(
                log.finishTime
              ).format("DD/MM HH:mm")}`}
            />
          )
        }
        if (log.type === "feeding") {
          return (
            <CustomListItem
              bullet={"🍼"}
              content={`${getBreastSide(log.isRight)}, ${Math.round(
                log.duration / 60
              )} min, ${moment(log.finishTime).format("DD/MM HH:mm")}`}
            />
          )
        }
        if (log.type === "weight") {
          return (
            <CustomListItem
              bullet={"⚖"}
              content={`${getWeightInKg(log.weight)}, ${moment(
                log.finishTime
              ).format("DD/MM HH:mm")}`}
            />
          )
        }
        return "Unknown type"
      })}
    </div>
  )
}

const CustomListItem = (props: ListItemProps) => (
  <ListItem
    classes={{
      container: styles.itemContainer,
      bullet: styles.bullet,
      bulletBorder: styles.bulletBorder,
      content: styles.content
    }}
    {...props}
  />
)

export default Logs
