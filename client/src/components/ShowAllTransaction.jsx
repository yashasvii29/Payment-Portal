import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Initialize react-modal
Modal.setAppElement('#root');

const ShowAllTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState(""); // Gender state
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleLogout = () => {
        // Clear authentication token (if using one)
        localStorage.removeItem("authToken");
        useNavigate("/"); // Redirect to login page
    };

    const handleProfileClick = () => {
        setShowProfileDetails(!showProfileDetails);
    };

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
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
            <div className="p-5">
                <h2 className="text-2xl font-semibold mb-4 text-purple-800">All Transactions</h2>
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-purple-800 text-white">
                        <tr>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-left">Amount</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx._id} className="border-b hover:bg-gray-100">
                                <td className="p-2">
                                    <button onClick={() => openModal(tx)} className="text-blue-500 hover:underline">
                                        {new Date(tx.createdAt).toLocaleDateString()}
                                    </button>
                                </td>
                                <td className="p-2">{tx.cardType}</td>
                                <td className="p-2">{tx.amount}</td>
                                <td className="p-2">{tx.status}</td>
                                <td className="p-2">{tx.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Transaction Details"
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                {selectedTransaction && (
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
                        <p><strong>Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleDateString()}</p>
                        <p><strong>Type:</strong> {selectedTransaction.cardType}</p>
                        <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                        <p><strong>Status:</strong> {selectedTransaction.status}</p>
                        <p><strong>Phone Number:</strong> {selectedTransaction.phoneNumber}</p>
                        <button onClick={closeModal} className="mt-4 bg-purple-800 text-white px-4 py-2 rounded-lg">
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ShowAllTransaction;