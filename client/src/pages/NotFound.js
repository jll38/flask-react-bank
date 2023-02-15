import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { Sidebar, Avatar, Button, Nav, Page} from 'grommet';
import { Projects, Clock, Help } from 'grommet-icons'


function NotFound() {
    return (
        <>
        <h1>404 Page Not Found</h1>
        <p>Sorry Mario, the page you're looking for is in another castle.</p>
        </>
    );
  }

export default NotFound