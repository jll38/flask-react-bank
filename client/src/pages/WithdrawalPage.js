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

function WithdrawalPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([{}]);
    useEffect(() => {
        fetch("http://localhost:5000/cardInfo").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                setIsLoading(false);
                console.log(data)
            }
        )
    }, [])
    return (
        <>
            <Box w='65%' h='250px' borderWidth='2px' borderRadius='lg' p="25px 30px" overflow='hidden'>
                <FormControl>
                    <Heading>Withdrawl</Heading>
                    <FormLabel>Enter an amount to Withdrawl</FormLabel>
                    <Input required type='number' step='0.01' placeholder='$0' id="input"></Input>
                    {isLoading ? (
                        <FormHelperText size='md'>Loading...</FormHelperText>
                    ) : <FormHelperText size='md'>Current Balance: ${data.balance}</FormHelperText>}
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        onClick={handleWithdrawal}>
                            Withdrawl
                        </Button>
                </FormControl>
            </Box>
        </>
    );

}

function handleWithdrawal(e){
    e.preventDefault();
    const withdrawlVal = parseFloat(document.getElementById('input').value);
    if (withdrawlVal <= 0){
        alert('Enter an amount GREATER THAN zero');
    } else{
        fetch('http://localhost:5000/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user : 'default', //Change later once login functionality truely works
                withdrawlVal: withdrawlVal})
        }).then((response) => response.json)
        .then((data) => {console.log(data);
                        window.location.replace("/dashboard");})
                        .catch((error) => console.error(error));
    }

}
export default WithdrawalPage