import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [detail, setDetail] = useState([])
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/")
            .then(res => {
                const data = res.data
                setDetail(data)
                console.log(res.data)
            })
    }, [])
    return (
        <div className='container'>
            <nav class="navbar navbar-light bg-danger m-2">
                <div class="container-fluid">
                    <div class="navbar-brand" href="#">
                            <h1>Parkzap Labs</h1>
                            <Link className='nav-link text-light' to="/login">Create</Link>

                    </div>
                </div>
            </nav>
            {detail.map((getdetail) => (
                <div class="card m-2">
                    <div class="card-header bg-secondary">
                        {getdetail.name}
                    </div>
                    <div class="card-body bg-dark text-light">
                        <h5 class="card-title">Phone Number</h5>
                        <p class="card-text">{getdetail.number}</p>
                        <h5 class="card-title">Email</h5>
                        <p class="card-text">{getdetail.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
