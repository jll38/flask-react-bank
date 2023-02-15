import 'antd/dist/reset.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Sidebar, Avatar, Button, Nav, Page } from 'grommet';
import { Projects, Clock, Help } from 'grommet-icons'
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';



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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App

