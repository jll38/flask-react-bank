import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Heading,
    Button
} from '@chakra-ui/react';
import bcrypt from 'bcryptjs';

function RegisterBox() {
    return (
        <>
            <Box w='500px' borderWidth='1px' borderRadius='lg' p="15px 30px" overflow='hidden'>
                <FormControl isRequired onSubmit={handleSubmit}>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' id="usernameInput" required/>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' id="passwordInput" required/>
                    <FormHelperText>Already a User? Login <a href='/'>here.</a></FormHelperText>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                </FormControl>
            </Box>
        </>
    )
}

export default RegisterBox

const handleSubmit = (e) => {
    e.preventDefault();
    //Get user input
    const user = document.getElementById('usernameInput').value;
    const pass = document.getElementById('passwordInput').value;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(pass, salt); // Hash Password
    console.log(`Plaintext Password ${pass}`);
    console.log(`Salt: ${salt}`)
    console.log(`Hashed Password ${hashedPassword}`);
    const data = {user, password: hashedPassword, salt}
    //Send Data to backend
    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'POST'
        },
        body: JSON.stringify(data),
    }).then((response) => response.json)
    .then((data) => {console.log(data)
                    window.location.replace("/dashboard");}) //Redirect to Dashboard
    .catch((error) => console.error(error));
}

