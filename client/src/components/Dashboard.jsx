import React from 'react';
import { Link } from 'react-router-dom';
import coin from '../assets/bitcoin.png';
import trans from '../assets/transaction.png'
import time from '../assets/time.png'
import search from '../assets/search.png'

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-300 min-h-screen">
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-[#e0b1cb] px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img src={coin} className="mr-3 h-14" alt="Logo" />
              <h1 className="pl-4 text-4xl font-bold">Payment</h1>
            </Link>
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
               className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg ml-8"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="text-center py-10">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to the Future of Payments</h1>
        <p className="text-lg text-white mb-10">
          Experience fast, secure, and seamless transactions with our payment portal.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/login"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="bg-transparent border border-white text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-purple-500"
          >
            Learn More
          </Link>
        </div>
      </main>

      <section className="py-16 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold text-purple-500 mb-6">Why Choose Us?</h2>
        <div className="flex justify-center space-x-10">
          <div className="w-1/3">
            <img
              src={trans}
              alt="Feature 1"
              className="mx-auto mb-4 h-32 w-32"
            />
            <h3 className="text-xl font-semibold">Secure Transactions</h3>
            <p className="text-gray-600">Your data and payments are protected with top-notch security measures.</p>
          </div>
          <div className="w-1/3">
            <img
              src={time}
              alt="Feature 2"
              className="mx-auto mb-4 h-32 w-32"
            />
            <h3 className="text-xl font-semibold">Fast Processing</h3>
            <p className="text-gray-600">Enjoy lightning-fast payment processing for all your transactions.</p>
          </div>
          <div className="w-1/3">
            <img
              src={search}
              alt="Feature 3"
              className="mx-auto mb-4 h-32 w-32"
            />
            <h3 className="text-xl font-semibold">User-Friendly</h3>
            <p className="text-gray-600">Our portal is designed with simplicity and ease of use in mind.</p>
          </div>
        </div>
      </section>

      <footer className="bg-purple-500 text-white py-6">
        <div className="text-center">
          <p>&copy; 2024 Payment Portal. All rights reserved.</p>
          <p>
            <Link to="/terms" className="underline hover:text-pink-200">
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link to="/privacy" className="underline hover:text-pink-200">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
