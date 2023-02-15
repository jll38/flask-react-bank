import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Image
  } from '@chakra-ui/react'
import LoginBox from '../components/LoginBox';

function LoginPage() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:5000/users").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return (
        <>
            <ol>
                {(typeof data.users === 'undefined') ? (
                    <p>Loading users...</p>) :
                    (data.users.map((user, i) => (
                        <li key={i}>{user}</li>
                    )))}
            </ol>
            <Image boxSize='500px' objectFit='cover' src='static\images\reask-bank-final.png' alt='reask-bank-logo'/>
            <LoginBox/>

        </>
    )
}

export default LoginPage

