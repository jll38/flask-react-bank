import 'antd/dist/reset.css';
import './App.css';
import React, { useState, useEffect} from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;


function App() {

const [data, setData] = useState([{}]);

useEffect(() => {
  fetch("/users").then(
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
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(6).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
    </>
  )
}

export default App
