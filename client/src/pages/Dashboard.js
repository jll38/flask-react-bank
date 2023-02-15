import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
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
  return (
    <>
      <Heading align='center'>Dashboard</Heading>
      <Stack direction={["column", "row"]} w='100%' spacing='30px'>
        <Box w='65%' h='500px' borderWidth='2px' borderRadius='lg' p="25px 30px" overflow='hidden'>
          <Heading size='lg'>Account Balance</Heading>
          <Heading size='md'>$1,000</Heading>

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
            <div>
              <Heading size='md'>General</Heading>
              <Divider orientation='horizontal' />
            </div>
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