import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from "lucide-react";

function Transaction() {
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState(""); // Gender state
    const navigate = useNavigate();
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const user = { name: "John Doe", balance: "$5,320", notifications: 2 };
    const [amount, setAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cardType, setCardType] = useState("credit");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Retrieve username and gender from localStorage
        const storedUsername = localStorage.getItem("username");
        const storedGender = localStorage.getItem("gender");
        if (storedUsername) setUserName(storedUsername);
        if (storedGender) setGender(storedGender);
    }, []);

    const handleLogout = () => {
        // Clear authentication token (if using one)
        localStorage.removeItem("authToken");
        navigate("/"); // Redirect to login page
    };

    const handleProfileClick = () => {
        setShowProfileDetails(!showProfileDetails);
    };

    const processPayment = async (paymentDetails) => {
        try {
            const response = await fetch('http://localhost:8080/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                throw new Error('Payment processing failed');
            }

            const result = await response.json();
            console.log('Payment successful:', result);
            setSuccessMessage("Payment successful!");
            setErrorMessage("");
        } catch (error) {
            console.error('Error processing payment:', error);
            setErrorMessage("Error processing payment. Please try again.");
            setSuccessMessage("");
        }
    };

    const handleConfirmPayment = () => {
        const paymentDetails = { amount, phoneNumber, cardType };
        console.log("Payment confirmed:", paymentDetails);
        processPayment(paymentDetails);
        navigate("/payment-page");
    };

    const handleCancelPayment = () => {
        // Handle payment cancellation logic here
        setAmount("");
        setPhoneNumber("");
        setCardType("credit");
        setSuccessMessage("");
        setErrorMessage("");
        navigate("/payment-page");
    };

    return (
        <div>

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

            <main className="p-4">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                    {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
                    {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                    <div className="mb-4">
                        <label className="block text-gray-700">Amount to be Paid</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Card Type</label>
                        <select
                            value={cardType}
                            onChange={(e) => setCardType(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        >
                            <option value="credit">Credit Card</option>
                            <option value="debit">Debit Card</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleConfirmPayment}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            Confirm Payment
                        </button>
                        <button
                            onClick={handleCancelPayment}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel Payment
                        </button>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Transaction