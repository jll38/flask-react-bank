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
import RegisterBox from '../components/RegisterBox';

function RegisterPage() {
    const [data, setData] = useState([{}]);

    return (
        <>
            <Image boxSize='500px' objectFit='cover' src='static\images\reask-bank-final.png' alt='reask-bank-logo'/>
            <RegisterBox/>

        </>
    )
}

export default RegisterPage
