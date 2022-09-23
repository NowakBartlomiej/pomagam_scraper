import React, {useState, useEffect} from "react";

import styled from "styled-components";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function getAPIData() {
    return axios.get('http://localhost:3000/daily_sum').then((response) => response.data)
}

const ChartDiv = styled.div`
    margin: 10rem auto;
    width: 50vw;
    height: 50vh;
`

const BarChart = () => {
    const[amount, setAmount] = useState([])

    useEffect(() => {
        let mounted = true
        getAPIData().then((items) => {
            if (mounted ) {
                setAmount(items)
            }
        })
        return () => (mounted = false)
    }, [])
    
    const dateTab = []
    const amountTab = []

    amount.map((a) => {
        return( dateTab.push(a.created_at.slice(0, -14)) &&
        amountTab.push(a.daily_sum) )   
    })
    
    const [charData, setCharData] = useState({
        datasets: [],
    })
    

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setCharData({
            labels: dateTab,
            datasets: [{
                label: 'Sum of the day',
                data: amountTab,
                borderColor: 'rgb(0, 105, 95)',
                backgroundColor: 'rgba(0, 150, 136, 0.80)'
            },
        ],
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Daily sums"
            }
        }
        })
    }, [])

    return <ChartDiv>
            <Bar options={chartOptions} data={charData} />
        </ChartDiv>
}

export default BarChart