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

function DepositPage() {

    return (
        <>
            <Box w='65%' h='250px' borderWidth='2px' borderRadius='lg' p="25px 30px" overflow='hidden'>
                <FormControl>
                    <Heading>Deposit</Heading>
                    <FormLabel>Enter an amount to Deposit</FormLabel>
                    <Input required type='number' step='0.01' placeholder='$0' id="input"></Input>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleDeposit}>
                            Deposit
                        </Button>
                </FormControl>
            </Box>
        </>
    );

}

function handleDeposit(e){
    e.preventDefault();
    const depositVal = parseFloat(document.getElementById('input').value);
    if (depositVal <= 0){
        alert('Enter an amount GREATER THAN zero');
    } else{
        fetch('http://localhost:5000/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user : 'default', //Change later once login functionality truely works
                depositVal: depositVal })
        }).then((response) => response.json)
        .then((data) => {console.log(data);
                        window.location.replace("/dashboard");})
                        .catch((error) => console.error(error));
    }

}
export default DepositPage