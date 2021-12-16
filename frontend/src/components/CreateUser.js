import React, { Fragment, useState, useEffect } from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateUser() {
    // create form skeleton
    const [form, setForm, reset] = useState({
        email: "",
        name: "",
        number: "",
        dob: "",
        password: "",

    })


    // destructre form elmenet in const variable
    const { email, name, number, dob, password } = form;
    const [startDate, setStartDate] = useState(new Date());
    const [redirect, setRedirect] = useState(false);
    const config = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const onChange = e => setForm({
        ...form,
        [e.target.name]: e.target.value
    })
    let navigate = useNavigate();
    // creating state to store the field errors
    const [errorbool, SetErrorBool] = useState(null)
    const [emailerr, setEmailErr] = useState('')
    const [numbererr, setNumberErr] = useState('')
    const [doberr, setDobErr] = useState('')
    const [passworderr, setPasswordErr] = useState('')

    const onSubmit = e => {
        e.target.reset()
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/create/", form, config)
            .then((res) =>{
                // if there is no error it will go to users page
                navigate('/')
            })
            .catch(function (error) {
                // we will store field errors and when submitted it will printed
                if (error.response) {
                    // it will log field error from django
                    window.alert("Refresh and login again")
                    // custom user with this email already exists. = error.response.data.email[0]
                     // data.email is array (see the error.response.data)
                    setEmailErr(error.response.data.email[0]);
                    console.log(emailerr)

                    // as data.number is object
                    setNumberErr(error.response.data.number.phoneerror)
                    console.log(numbererr)

                    setDobErr(error.response.data.dob[0])
                    console.log(doberr)

                    setPasswordErr(error.response.data.password[0])

                    SetErrorBool(error.response.data.status)
                }

            })
    }

    return (
        <div className='container'>
            <nav class="navbar navbar-light bg-danger mt-2">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <h1>Parkzap</h1>
                    </a>
                </div>
            </nav>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group mt-2'>
                    {/* error recieved from backend */}
                    {emailerr}
                    <input
                        className="form-control"
                        type="Email"
                        placeholder="Email"
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required>
                    </input>
                </div>
                <div className='form-group mt-2'>
                    <input
                        className="form-control"
                        type="name"
                        placeholder="Name"
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required>
                    </input>
                </div>
                <div className='form-group mt-2'>
                    {numbererr}
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Number"
                        name='number'
                        value={number}
                        onChange={e => onChange(e)}
                        required>
                    </input>
                </div>
                <div className='form-group mt-2'>
                    {doberr}
                    <input
                        className="form-control"
                        type="dob"
                        placeholder="dob"
                        name='dob'
                        value={dob}
                        onChange={e => onChange(e)}
                        required>
                    </input>
                </div>
                <div className='form-group mt-2'>
                    {passworderr}
                    <input
                        className="form-control"
                        type="password"
                        placeholder="password"
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        required>
                    </input>
                </div>
                <button className='btn btn-danger mt-2' type='submit'>Create</button>
            </form>
        </div>
    )
}
