import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import HeaderDiv from '../components/HeaderDiv';
import {
  Heading,
  Text,
  Box,
  Stack,
  HStack,
  Divider,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'



function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:5000/dashboard").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        setIsLoading(false);
        console.log(data)
        console.log(data.transactions)
      }
    )
  }, [])
  return (
    <>
      <Heading mb='15px' align='center'>Dashboard</Heading>
      <Stack direction={["column", "row"]} w='100%' spacing='30px'>
        <Box w='65%' h='500px' borderWidth='2px' borderRadius='lg' p="25px 30px" overflow='hidden'>
          <Heading size='lg'>Account Balance</Heading>
          {isLoading ? (
            <Heading size='md'>Loading...</Heading>
          ) : <Heading size='md'>${data.balance}</Heading>}
          <Stack direction={["row","column"]}>
            <Button
              as={'a'}
              mt={4}
              colorScheme='teal'
              href={'/withdrawl'}
              w='40%'
            >
              Withdrawl
            </Button>
            <Button
              as={'a'}
              mt={4}
              colorScheme='teal'
              href={'/deposit'}
              w='40%'
            >
              Deposit
            </Button></Stack>

          <div id='transactions'>
            <Heading mt='40px' size='lg'>Transactions</Heading>
            <TableContainer h='270px' overflowY='scroll'>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Source</Th>
                    <Th>Amount</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
            {isLoading ? (
              <Tr>
                <Td>Loading...</Td>
              </Tr>
            ) : (
              data.transactions.reverse().map((transaction, index) => (
                <Tr key={index} color={transaction[5] === "add" ? 'green.500' : 'red.500'}>
                  <Td>{transaction[2]}</Td>
                  <Td>{transaction[5] === "add" ? '+ ' : '- '}{`$${transaction[3]}`}</Td>
                  <Td>{transaction[4]}</Td>
                </Tr>
              ))
            )}
          </Tbody>
              </Table>
            </TableContainer>
          </div>

        </Box>
        <VStack w='30%'>
          <Box w='100%' h='250px' borderWidth='2px' borderRadius='lg' p="15px 30px" overflow='hidden'>
            <HeaderDiv text="User Info" />
            <Heading mt='10px' size='sm'>Card No.</Heading>
            {isLoading ? (
              <Text size='md'>Loading...</Text>
            ) : <Text size='md'>{data.cardNum}</Text>}
            <Heading mt='10px' size='sm'>Expiration</Heading>
            {isLoading ? (
              <Text size='md'>Loading...</Text>
            ) : <Text size='md'>{data.expiration}</Text>}
            <Heading mt='10px' size='sm'>CSV</Heading>
            {isLoading ? (
              <Text size='md'>Loading...</Text>
            ) : <Text size='md'>{data.csv}</Text>}
          </Box>
          <Box w='100%' h='250px' borderWidth='2px' borderRadius='lg' p="15px 30px" overflow='hidden'>
            <div>
              <Heading size='md'>Notifications</Heading>
              <Divider orientation='horizontal' />
            </div>
          </Box>
        </VStack>
      </Stack>
    </>
  );
}

export default Dashboard