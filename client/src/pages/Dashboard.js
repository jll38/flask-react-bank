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
  VStack
} from '@chakra-ui/react'


function Dashboard() {
  return (
    <>
      <Heading align='center'>Dashboard</Heading>
      <Stack direction={["column", "row"]} w='100%' spacing='30px'>
        <Box w='65%' h='500px' borderWidth='2px' borderRadius='lg' p="15px 30px" overflow='hidden'>
          <Heading size='md'>Account Balance</Heading>
          <Text>$1,000</Text>
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
              <Heading size='md'>Recent Transactions</Heading>
              <Divider orientation='horizontal' />
            </div>
          </Box>
        </VStack>
      </Stack>
    </>
  );
}

export default Dashboard