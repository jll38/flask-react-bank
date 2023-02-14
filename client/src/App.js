import 'antd/dist/reset.css';
import './App.css';
import React, { useState, useEffect} from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;


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
},[])
  return (
    <>
      {(typeof data.users === 'undefined') ? (
      <p>Loading users...</p>) :
      (data.users.map((user, i) => (
        <p key={i}>{user}</p>
      )))}
    </>
  )
}

export default App
