import React, { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getShoeMonthSales, getShoeMonthSalesCompareWith, getShoeYearSales, getShoeYearSalesCompareWith } from '../redux/slice/shoes.slice'

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
          return value?.toLocaleString();
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

const year = [...Array(5).keys()].map((num) => new Date().getFullYear() - num)

const month = [...Array(12).keys()].map((num) => num + 1)

const getValueByType = (value, type) => {
  return Object.values(value).find((item) => typeof item === type)
}

const getChartData = (arr) => {
  let newArr = arr.map((item, index) => {
    return {
      x: getValueByType(item, 'string'),
      y: getValueByType(item, 'number'),
    }
  });
  if (arr.length != 12) {
    newArr.sort((a, b) => new Date(a.x) - new Date(b.x));
  }
  return newArr;
}

const ShoeSalesLineChart = ({ props }) => {
  let { shoeId } = props
  const dispatch = useDispatch()
  const [chartState, setChartState] = useState(state_chart)
  const { shoeSales, shoeSalesCompareWith } = useSelector((state) => state.shoes)
  const [chartLoading, setChartLoading] = useState(false);
  const yearSales = useRef(year[0])
  const yearSalesCompareWith = useRef(0)
  const monthSales = useRef(0)
  const chartSeriesData = useRef([])
  useEffect(() => {
    setChartLoading(true)
    handleOnChangeYear(yearSales.current)
  }, [dispatch])


  useEffect(() => {

    chartSeriesData.current[0] =
    {
      name: "Total Sales " + yearSales.current,
      data: getChartData(shoeSales)
    }
    if (yearSalesCompareWith.current > 0) {
      chartSeriesData.current[1] =
      {
        name: "Total Sales " + yearSalesCompareWith.current,
        data: getChartData(shoeSalesCompareWith)
      }
    } else if (yearSalesCompareWith.current == 0) {
      chartSeriesData.current.length = 1
    }

    let chartCategories = shoeSales.map((item) => getValueByType(item, 'string'))

    setChartState((prev) => {
      return dynamic_state_chart(prev,
        chartCategories.length == 12 ? 'Year Sales' : 'Month Sales',
        chartCategories,
        chartSeriesData.current
      )
    });
  }, [shoeSales, shoeSalesCompareWith])

  const handleOnChangeMonth = (month) => {
    monthSales.current = month
    if (month != 0) {
      dispatch(getShoeMonthSales({
        params: {
          shoeId: shoeId,
          month: month,
          year: yearSales.current
        }
      }))
    } else {
      handleOnChangeYear(yearSales.current)
    }
    if (yearSalesCompareWith.current > 0) {
      handleOnChangeYearCompare(yearSalesCompareWith.current)
    }

  }

  const handleOnChangeYear = (year) => {
    yearSales.current = year
    if (monthSales.current == 0) {
      dispatch(getShoeYearSales({
        params: {
          shoeId: shoeId,
          year: yearSales.current
        }, setChartLoading: setChartLoading
      }))
    }
    else {
      dispatch(getShoeMonthSales({
        params: {
          shoeId: shoeId,
          month: monthSales.current,
          year: yearSales.current
        }
      }))
    }
  }

  const handleOnChangeYearCompare = (year) => {
    yearSalesCompareWith.current = year
    if (monthSales.current == 0) {
      dispatch(getShoeYearSalesCompareWith({
        params: {
          shoeId: shoeId,
          year: yearSalesCompareWith.current
        }, setChartLoading: setChartLoading
      }))
    }
    else {
      dispatch(getShoeMonthSalesCompareWith({
        params: {
          shoeId: shoeId,
          month: monthSales.current,
          year: yearSalesCompareWith.current
        }
      }))
    }
  }

  if (chartLoading) return <div>Loading...</div>

  return (
    <div className='py-2'>
      <div className='flex justify-end gap-x-2 items-center'>
        <select className="select select-bordered select-sm max-w-xs" onChange={(event) => {
          handleOnChangeMonth(event.target.value)
        }} >
          <option value="0" selected>month</option>
          {
            month.map((month, index) => <option key={index} value={month}>{month}</option>
            )
          }
        </select>
        <select className="select select-bordered select-sm max-w-xs" defaultValue={yearSales} onChange={(event) => {
          handleOnChangeYear(event.target.value)
        }} >
          {
            year.map((year, index) => <option key={index} value={year}>{year}</option>
            )
          }

        </select>
        <span>Compare With</span>
        <select className="select select-bordered select-sm max-w-xs" onChange={(event) => handleOnChangeYearCompare(event.target.value)} value={yearSalesCompareWith.current}>
          <option value="0">year</option>
          {
            year.filter((year) => year != yearSales.current).map((year, index) => <option key={index} value={year}>{year}</option>
            )
          }
        </select>
      </div>
      <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={475} />
    </div>
  )
}

export default ShoeSalesLineChart