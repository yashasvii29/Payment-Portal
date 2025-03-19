import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import pay from "../assets/Payment-PNG-Transparent.png";
import trans from "../assets/trans.jpeg";
import online from "../assets/online-transaction.webp";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [notifications, setNotifications] = useState([]); // Initially empty
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState(""); // Gender state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [successfulPaymentsPercentage, setSuccessfulPaymentsPercentage] = useState(0);
  const user = { name: "John Doe", balance: "$5,320", notifications: 2 };

  useEffect(() => {
    // Retrieve username and gender from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedGender = localStorage.getItem("gender");
    if (storedUsername) setUserName(storedUsername);
    if (storedGender) setGender(storedGender);

    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/payment-page");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);

        // Calculate the percentage of successful payments
        const successfulPayments = data.filter(tx => tx.status === "Completed").length;
        const totalPayments = data.length;
        const percentage = totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0;
        setSuccessfulPaymentsPercentage(percentage.toFixed(2));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token (if using one)
    localStorage.removeItem("authToken");
    navigate("/"); // Redirect to login page
  };

  const handleProfileClick = () => {
    setShowProfileDetails(!showProfileDetails);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center p-4 bg-purple-800 text-white shadow-lg">
        {/* Left Section: Welcome Message */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium">Welcome! {userName}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500"
            onClick={handleProfileClick}
            title="User Profile"
          >
            <User className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="focus:outline-none text-red bg-white-800 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Profile Details Panel */}
      {showProfileDetails && (
        <div className="absolute top-16 right-4 w-72 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b text-gray-800 font-semibold">
            Profile Details
          </div>
          <div className="p-4 text-sm text-gray-700">
            <p>
              <strong>Username:</strong> {userName}
            </p>
            <p>
              <strong>Email:</strong> {localStorage.getItem("email")}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
          </div>
        </div>
      )}
      <main>
        {/* Dashboard */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-lg p-4">
            <h2 className="text-lg font-semibold">Current Balance</h2>
            <p className="text-2xl font-bold">{user.balance}</p>
          </div>
          <div className="bg-white shadow-lg p-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <p className="text-xl">{transactions.length}</p>
          </div>
          <div className="bg-white shadow-lg p-4">
            <h2 className="text-lg font-semibold">Successful Payments</h2>
            <p className="text-xl">{successfulPaymentsPercentage}%</p>
          </div>
        </div>
        <div className="p-6 flex gap-4">
          <div className="w-1/3">
            <img src={online} alt="Feature 1" className="mx-5 mb-2 h-30 w-32" />
            <button className="bg-blue-600 text-white px-8 py-2 mg-2 mb-2">
              <Link to="/transaction">
                Make a Payment
              </Link>
            </button>
          </div>
          <div className="w-1/3">
            <img src={trans} alt="Feature 1" className="mx-5 mb-2 h-30 w-32" />
            <button className="bg-green-600 text-white px-4 py-2 mg-2 mb-2">
              <Link to="/transactions">
                View All Transactions
              </Link>
            </button>
          </div>
          <div className="w-1/3">
            <img src={pay} alt="Feature 1" className="mx-5 mb-2 h-30 w-32" />
            <button className="bg-gray-600 text-white px-8 py-2 mg-2 mb-2">
              Manage Payment Methods
            </button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <table className="w-full bg-white shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-b">
                  <td className="p-2">{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{tx.cardType}</td>
                  <td className="p-2">{tx.amount}</td>
                  <td className="p-2">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Payment;