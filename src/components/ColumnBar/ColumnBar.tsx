import React, { ReactNode } from "react"
import Chart from "react-apexcharts"

const ColumnBar = ({
  stacked,
  series,
  categories,
  title
}: {
  stacked: boolean
  series: Array<any>
  categories: Array<string>
  title: ReactNode
}) => {
  const options = {
    chart: {
      type: "bar",
      height: 250,
      stacked: stacked,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 5
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: categories
    },
    legend: {
      position: "right",
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  }

  return (
    <div>
      <div>{title}</div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  )
}

export default ColumnBar
