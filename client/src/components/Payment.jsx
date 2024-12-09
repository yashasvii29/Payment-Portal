// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
//         <h1 className="text-2xl font-bold text-blue-600 mb-4">
//           Welcome to the Payment Portal!
//         </h1>
//         <p className="text-gray-700 mb-6">
//           Your account has been successfully created. You can now manage your payments, view transactions, and more.
//         </p>
//         <div className="space-y-4">
//           <button
//             onClick={() => navigate("/make-payment")}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Make a Payment
//           </button>
//           <button
//             onClick={() => navigate("/transactions")}
//             className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//           >
//             View Transactions
//           </button>
//           <button
//             onClick={() => navigate("/profile")}
//             className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
//           >
//             Manage Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;



import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center">
      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
          <h1 className="text-3xl font-bold">Welcome to the Payment Portal!</h1>
          <p className="text-lg mt-2">Your account has been successfully created.</p>
        </div>

        {/* Content Section */}
        <div className="p-8 text-center space-y-6">
          <p className="text-gray-700">
            Start exploring your account by making a payment, viewing your transactions, or managing your profile.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            
            <button
              onClick={() => navigate("/make-payment")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300"
            >
              💳 Make a Payment
            </button>
            <button
              onClick={() => navigate("/transactions")}
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transform transition duration-300"
            >
              📜 View Transactions
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transform transition duration-300"
            >
              🛠️ Manage Profile
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-100 text-gray-600 p-4 text-sm text-center">
          <p>Need help? <span className="text-blue-600 underline cursor-pointer">Contact Support</span></p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
