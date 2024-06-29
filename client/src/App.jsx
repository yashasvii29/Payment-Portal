import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
// import Register from './components/Auth/Register'
import Login from './components/Auth/Login '
import Dashboard  from './components/Dashboard'
import ChangePassword from './components/Auth/ChangePassword'

const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>           
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Dashboard/>} />
            <Route path='/change' element={<ChangePassword/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App