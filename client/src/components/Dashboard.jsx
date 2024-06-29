import React from 'react'
import {Link} from 'react-router-dom';


const Dashboard = () => {
  return (
    <div>
        <nav>
           
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        </nav>
    </div>
  )
}

export default Dashboard