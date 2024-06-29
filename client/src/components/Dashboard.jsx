import React from 'react'
import {Link} from 'react-router-dom';
// import {coin} from '../assets/bitcoin.png'
import coin from '../assets/bitcoin.png'
// import {Link} from 'react-router-dom'
// import Login from './Auth/Login ';
// import Register from './Auth/Register';



const Dashboard = () => {
  return (
    <div className='bg-purple-200'>
        <header className="shadow sticky z-50 top-0 ">
            <nav className="bg-[#e0b1cb] px-4 lg:px-6 py-2.5">
                <div className="flex  flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={coin}
                            className="mr-3 h-14"
                            alt="Logo"
                        />
                        
                        <h1 className=' pl-4 text-4xl font-bold'>Payment</h1>
                        
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-purple-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-gray-800 hover:bg-purple-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Register
                        </Link>
                        {/* <Link
                            to="#"
                            className="text-white bg-purple-400 hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link> */}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        {/* <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text=orange-700":"text-gray-700" } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/About"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text=orange-700":"text-gray-700" } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>
        </header>
    </div>
    

    
  )
}

export default Dashboard