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

function LoginBox() {
    const [loginFailed, setLoginFailed] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const data = { user, password }
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    window.location.replace("/dashboard"); //Redirect to Dashboard
                    setLoginFailed(false);
                } else{
                    setLoginFailed(true);
                }
            }) 
            .catch((error) => console.error(error));
    }
    
    return (
        <>
            <Box w='500px' borderWidth='1px' borderRadius='lg' p="15px 30px" overflow='hidden'>
                <FormControl onSubmit={handleSubmit} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' id="usernameInput" placeholder />
                    <FormLabel>Password</FormLabel>
                    <Input type='password' id="passwordInput" />
                    {loginFailed && <FormHelperText color='red.500'>Incorrect username or password</FormHelperText>}
                    <FormHelperText>New user? Register <a href='/register'>here.</a></FormHelperText>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </FormControl>
            </Box>
        </>
    )
}

export default LoginBox

