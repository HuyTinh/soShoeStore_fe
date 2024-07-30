import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import SalesApi from '../api/services/salesApi';

const state_chart = {
  series: [
  ],
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 500
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500
        }
      }
    },
    colors: ['#77B6EA', '#545454'],
    stroke: {
      curve: 'smooth'
    },
    title: {
      align: 'center',
      style: {
        fontSize: '24px',
      }
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 5
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value?.toLocaleString() + ' VND';
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  },
}

const dynamic_state_chart = (state, title, categories, data) => {
  return {
    ...state,
    options: {
      ...state.options,
      xaxis: {
        categories: categories
      },
      title: {
        ...state.options.title,
        text: title
      }
    },
    series: data
  }
}

const getValueByType = (value, type) => {
  return Object.values(value).find((item) => typeof item === type)
}

const TotalSalesLineChart = () => {
  const [chartState, setChartState] = useState(state_chart)

  useEffect(() => {
    (
      async () => {

        await SalesApi.getYearSales().then((response) => {
          setChartState((prev) => {
            return dynamic_state_chart(prev,
              'Year Sales',
              response.map((item) => getValueByType(item, 'string')),
              [{
                name: 'Sales',
                data: response.map((item, index) => {
                  return {
                    x: getValueByType(item, 'string'),
                    y: getValueByType(item, 'number'),
                  }
                })
              }]
            )
          });
        })
      }
    )()
  }, [])

  return (
    <ReactApexChart options={chartState.options} series={chartState.series} type="line" />
  )
}

export default TotalSalesLineChart