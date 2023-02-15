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

function RegisterPage() {
    const [data, setData] = useState([{}]);

    return (
        <>
            <Image boxSize='500px' objectFit='cover' src='static\images\reask-bank-final.png' alt='reask-bank-logo'/>
            <LoginBox/>

        </>
    )
}

export default RegisterPage

