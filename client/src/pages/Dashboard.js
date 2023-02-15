import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import {
  Heading,
  Box
} from '@chakra-ui/react'


function Dashboard() {
  return (
    <>
      <Heading align='center'>Dashboard</Heading>
      <Box w='100%' borderWidth='1px' borderRadius='lg' p="15px 30px" overflow='hidden'>
        
      </Box>
    </>
  );
}

export default Dashboard