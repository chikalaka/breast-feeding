import React from "react"
import { DiaperingLog } from "../../types/common"
import ColumnBar from "../ColumnBar/ColumnBar"
import { getWeeklySum } from "../../helpers/helpers"

const getTypeCount = ({
  isPeeCount,
  isPooCount,
  isBothCount
}: {
  isPeeCount?: boolean
  isPooCount?: boolean
  isBothCount?: boolean
}) => ({ isPee, isPoo }: DiaperingLog) => {
  if (isPee && isPoo && isBothCount) return 1
  if (isPee && !isPoo && isPeeCount) return 1
  if (isPoo && !isPee && isPooCount) return 1
  return 0
}

const DiaperingGraph = ({
  diaperingLogs
}: {
  diaperingLogs: Array<DiaperingLog>
}) => {
  const peeWeeklySum = getWeeklySum({
    // @ts-ignore
    sum: getTypeCount({ isPeeCount: true }),
    logs: diaperingLogs
  })
  const pooWeeklySum = getWeeklySum({
    // @ts-ignore
    sum: getTypeCount({ isPooCount: true }),
    logs: diaperingLogs
  })
  const bothWeeklySum = getWeeklySum({
    // @ts-ignore
    sum: getTypeCount({ isBothCount: true }),
    logs: diaperingLogs
  })
  const series = [
    {
      name: "Pee",
      data: peeWeeklySum.map(v => v[0])
    },
    {
      name: "Poo",
      data: pooWeeklySum.map(v => v[0])
    },
    {
      name: "Pee & Poo",
      data: bothWeeklySum.map(v => v[0])
    }
  ]

  const categories = peeWeeklySum.map(v => v[1])
  return (
    <ColumnBar
      title={"Diapering count"}
      stacked={true}
      series={series}
      // @ts-ignore
      categories={categories}
    />
  )
}

export default DiaperingGraph
