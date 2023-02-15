import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Heading
  } from '@chakra-ui/react';

function LoginBox() {
    return(
        <>
        <Box w='500px' borderWidth='1px' borderRadius='lg' p="15px 30px" overflow='hidden'>
             <FormControl onSubmit={handleSubmit}>
                <FormLabel>Username</FormLabel>
                <Input type='text' name="name" placeholder />
                <FormLabel>Password</FormLabel>
                <Input type='text' name="password"/>
                <FormHelperText>New user? Register <a href='/register'>here.</a></FormHelperText>
            </FormControl>
        </Box>
        </>
    )
}

export default LoginBox

const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
