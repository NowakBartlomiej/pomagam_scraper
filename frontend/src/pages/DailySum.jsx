import React, {useState, useEffect} from 'react'
import './DailySum.css'
import axios from 'axios'


function getAPIData() {
    return axios.get('http://localhost:3000/daily_sum').then((response) => response.data)
}

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').slice(0, -2) + ' zł';
}

const DailySum = () => {
    const[amount, setAmount] = useState([])

    // useEffect(() => {
    //     fetch('http://localhost:3000/daily_sum')
    //     .then(response => response.json().then(value => {setAmount(value)}))
    // }, [])

    useEffect(() => {
        let mounted = true
        getAPIData().then((items) => {
            if (mounted ) {
                setAmount(items)
            }
        })
        return () => (mounted = false)
    }, [])


    const sums = []
    amount.map((a) => {
        return sums.push(numberWithCommas(a.daily_sum))
    })


    
    return (
        <main>
            {/* <div className='contener'>
                <div className='content'>
                    
                    <header className='title'>Today we collected:</header>
                    
                    <div className='box'>
                        <span className='amount'>1234251 zł</span>
                    </div>
                </div>
            </div> */}

            <div className="wrapper">
                
                <header>Today we collected</header>
                
                <div className="content">
                    <span>{ sums[0] }</span>
                
                    </div>
            </div>

        </main>
    )
}

export default DailySum