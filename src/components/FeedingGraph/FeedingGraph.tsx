import React from "react"
import { getWeeklySum } from "../../helpers/helpers"
import { FeedingLog } from "../../types/common"
import ColumnBar from "../ColumnBar/ColumnBar"

const getDuration = (isRightBreast: boolean) => ({
  isRight,
  duration
}: FeedingLog) => (isRight === isRightBreast ? Math.round(duration / 60) : 0)

const FeedingGraph = ({ feedingLogs }: { feedingLogs: Array<FeedingLog> }) => {
  const weeklyLeftSum = getWeeklySum({
    // @ts-ignore
    sum: getDuration(false),
    logs: feedingLogs
  })
  const weeklyRightSum = getWeeklySum({
    // @ts-ignore
    sum: getDuration(true),
    logs: feedingLogs
  })
  const series = [
    {
      name: "Left",
      data: weeklyLeftSum.map(v => v[0])
    },
    {
      name: "Right",
      data: weeklyRightSum.map(v => v[0])
    }
  ]

  const categories = weeklyLeftSum.map(v => v[1])

  return (
    <ColumnBar
      title={"Feeding Duration (min)"}
      stacked={true}
      series={series}
      // @ts-ignore
      categories={categories}
    />
  )
}

export default FeedingGraph
