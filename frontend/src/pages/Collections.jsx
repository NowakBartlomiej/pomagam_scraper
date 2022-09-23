import React, {useState, useEffect} from 'react';

import Table from '../components/Table';


const Collections = () => {
    const [sums, setSums] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/collections').then(
        response => response.json().then(data => {
            setSums(data)
        })
        )
    }, [])
    
    return (
        <div>
            <Table data={ sums }/>
        </div>
        );
};

export default Collections;