import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import SalesApi from "../api/services/salesApi";

const chart_state = (series, labels) => {
    return {
        series: series,
        options: {
            chart: {
                type: 'pie',
            },
            labels: labels,
            title: {
                align: 'center',
                style: {
                    fontSize: '16px',
                },
                text: "Year Sales"
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }
};

const getValueByType = (value, type) => {
    return Object.values(value).find((item) => typeof item === type)
}

const ShoeCategorySalesPieChart = () => {
    const [chartState, setChartState] = useState(chart_state([]));


    useEffect(() => {
        (async () => {
            await SalesApi.getYearSales().then((response) => {
                setChartState(chart_state(
                    response.filter(item => (getValueByType(item, 'number')) != 0).map(item => getValueByType(item, 'number')),
                    response.filter(item => (getValueByType(item, 'number')) != 0).map(item => getValueByType(item, 'string')))
                )
            })
        })()
    }, [])


    return (
        <ReactApexChart options={chartState.options} series={chartState.series} type="pie" />
    )
}

export default ShoeCategorySalesPieChart