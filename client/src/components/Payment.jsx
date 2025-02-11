
// import React from "react";


// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center">
//       {/* Card Container */}
//       <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
//           <h1 className="text-3xl font-bold">Welcome to the Payment Portal!</h1>
//           <p className="text-lg mt-2">Your account has been successfully created.</p>
//         </div>

//         {/* Content Section */}
//         <div className="p-8 text-center space-y-6">
//           <p className="text-gray-700">
//             Start exploring your account by making a payment, viewing your transactions, or managing your profile.
//           </p>

//           {/* Action Buttons */}
//           <div className="space-y-4">
            
//             <button
//               onClick={() => navigate("/make-payment")}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300"
//             >
//               💳 Make a Payment
//             </button>
//             <button
//               onClick={() => navigate("/transactions")}
//               className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transform transition duration-300"
//             >
//               📜 View Transactions
//             </button>
//             <button
//               onClick={() => navigate("/profile")}
//               className="w-full bg-yellow-500 text-white py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transform transition duration-300"
//             >
//               🛠️ Manage Profile
//             </button>
//           </div>
//         </div>

//         {/* Footer Section */}
//         <div className="bg-gray-100 text-gray-600 p-4 text-sm text-center">
//           <p>Need help? <span className="text-blue-600 underline cursor-pointer">Contact Support</span></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;




import React, { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";

const Payment = () => {
  const [notifications, setNotifications] = useState([]); // Initially empty
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState(""); // Gender state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  useEffect(() => {
    // Retrieve username and gender from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedGender = localStorage.getItem("gender");
    if (storedUsername) setUserName(storedUsername);
    if (storedGender) setGender(storedGender);

    // Simulate fetching notifications from a server
    const fetchedNotifications = [
      "Payment of $100 received.",
      "Your subscription is expiring soon.",
      "New offer available: 20% off on premium plans."
    ];
    setNotifications(fetchedNotifications);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Clear notifications when viewed
      setNotifications([]);
    }
  };

  const handleProfileClick = () => {
    setShowProfileDetails(!showProfileDetails);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg">
        {/* Left Section: Welcome Message */}
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6" />
          <span className="text-lg font-medium">Welcome, {userName}</span>
        </div>

        {/* Right Section: Notification and Profile Icons */}
        <div className="flex items-center space-x-4">
          <div
            className="relative cursor-pointer"
            onClick={handleNotificationClick}
            title="Notifications"
          >
            <Bell className="w-6 h-6 hover:text-gray-300" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
            )}
          </div>
          <div
            className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500"
            onClick={handleProfileClick}
            title="User Profile"
          >
            <User className="w-5 h-5" />
          </div>
        </div>
      </nav>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-72 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b text-gray-800 font-semibold">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-4 text-sm text-gray-700 hover:bg-gray-100 border-b last:border-none"
              >
                {notification}
              </li>
            ))}
          </ul>
          {notifications.length === 0 && (
            <div className="p-4 text-sm text-gray-500">No new notifications.</div>
          )}
        </div>
      )}

      {/* Profile Details Panel */}
      {showProfileDetails && (
        <div className="absolute top-16 right-4 w-72 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b text-gray-800 font-semibold">Profile Details</div>
          <div className="p-4 text-sm text-gray-700">
            <p><strong>Username:</strong> {userName}</p>
            <p><strong>Email:</strong> {localStorage.getItem("email")}</p>
            <p><strong>Gender:</strong> {gender}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

