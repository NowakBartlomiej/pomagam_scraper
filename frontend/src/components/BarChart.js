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

async function getAPIData() {
    const response = await axios.get('http://localhost:3000/daily_sum');
    return response.data;
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
            labels: dateTab.reverse(),
            datasets: [{
                label: 'Sum of the day',
                data: amountTab.reverse(),
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


// import axios from "axios";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Form } from "react-router-dom";
// import styled from "styled-components";
// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
// import { Line} from "react-chartjs-2"

// // const ChartDiv = styled.div`
// //     margin: 10rem auto;
// //     width: 50vw;
// //     height: 50vh;
// // `

// ChartJS.register(
//     ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
// )

// const BarChart = () => {
//     const [chartData, setChartData] = useState({})

//     useEffect(() => {
//         const fetchData = async () => {
//             const {data} = await axios.get("http://localhost:3000/daily_sum")
//             setChartData({
//                 labels: data.data.map((item) => item.id),
//                 datasets: {
//                     label: "Sum of the day",
//                     data: data.data.map(item => item.daily_sum),
//                     borderColor: 'rgb(0, 105, 95)',
//                     backgroundColor: 'rgba(0, 150, 136, 0.80)'
//                 }
//             })
//         }
//         fetchData()
//     }, [])
    
//     return <div>
//         <Line 
//             data={chartData}
//             options={{
//                 responsive: true,
//                 plugins: {
//                     legend: {position: 'top'},
//                     title: {display: true, text: "Daily Sum"}
//                 }
//             }}
//         />
//     </div>
// }

// export default BarChart
