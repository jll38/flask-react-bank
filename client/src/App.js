import 'antd/dist/reset.css';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import DepositPage from './pages/DepositPage';
import WithdrawalPage from './pages/WithdrawalPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import useToken from './components/useToken';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react'



function App() {

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/users").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <ChakraProvider>
      <Navbar />
      <Container maxW='1000px' p='20px' mb='10px'centerContent>
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LoginPage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/withdrawl" element={<WithdrawalPage />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </Container>
      <Footer />
    </ChakraProvider>
  )
}

export default App

