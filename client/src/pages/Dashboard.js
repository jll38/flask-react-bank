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
          ) : <Heading size='md'>${data}</Heading>}

          <div id='transactions'>
          <Heading mt='80px' size='lg'>Transactions</Heading>
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
                <Tr color='red.500'>
                  <Td>Withdrawl</Td>
                  <Td>$400</Td>
                  <Td> 10/11/22</Td>
                </Tr>
                <Tr color='green.500'>
                  <Td>Deposit</Td>
                  <Td>$200</Td>
                  <Td> 10/10/22</Td>
                </Tr>
                <Tr color='green.500'>
                  <Td>Deposit</Td>
                  <Td>$200</Td>
                  <Td> 10/19/22</Td>
                </Tr>
                <Tr color='green.500'>
                  <Td>Deposit</Td>
                  <Td>$200</Td>
                  <Td> 10/19/22</Td>
                </Tr>
                <Tr color='green.500'>
                  <Td>Deposit</Td>
                  <Td>$200</Td>
                  <Td> 10/19/22</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          </div>

        </Box>
        <VStack w='30%'>
          <Box w='100%' h='250px' borderWidth='2px' borderRadius='lg' p="15px 30px" overflow='hidden'>
            <HeaderDiv text="User Info"/>
            <Heading size='sm'>Card No.</Heading>
            <Text>5105105105105100</Text>
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