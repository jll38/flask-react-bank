import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { Sidebar, Avatar, Button, Nav, Page} from 'grommet';
import { Projects, Clock, Help } from 'grommet-icons'


function HomePage() {
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
      <>
        {(typeof data.users === 'undefined') ? (
          <p>Loading users...</p>) :
          (data.users.map((user, i) => (
            <p key={i}>{user}</p>
          )))}
        <form onSubmit={handleSubmit}>
          <input type='text' name="name" placeholder='Name' />
          <input type='text' name="password" placeholder='Password' />
          <input type='submit'></input>
        </form>
        <div class="main">
  
        </div>
      </>
    )
  }

  export default HomePage

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    fetch('http://localhost:5000/submit-form', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  