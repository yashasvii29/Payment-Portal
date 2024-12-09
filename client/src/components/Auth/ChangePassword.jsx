import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import payimg from "../../assets/payment.jpeg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  
  const [password, setPassword] = useState("");
  const [changepassword, setChangepassword] = useState("");
  const navigate = useNavigate("");

  async function loginUser(data) {
    try {
      const res = await axios.post("http://localhost:8080/login", data);
      console.log(res.data.data.userDBInfo);
      localStorage.setItem('username', res.data.data.userDBInfo.username);
      localStorage.setItem('email', res.data.data.userDBInfo.email);
      localStorage.setItem('user', JSON.stringify(res.data.data.userDBInfo));
      navigate("/chatroom");
    } catch (error) {
      console.log("Error in login user:", error.message);
      navigate("/login");
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(changepassword, password);
    loginUser({ password ,changepassword});
  };

  return (
    <div className="min-h-screen bg-purple-200 flex justify-center items-center">
      <div className="w-full max-w-4xl h-full md:h-5/6 bg-[#f7cad0] flex flex-col md:flex-row justify-center items-center rounded-xl p-4 md:p-8">
        <div className="w-full md:w-1/2 h-full md:h-5/6 bg-[#edafb8] rounded-2xl flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8">
            <h1 className="text-center text-xl font-medium">Change Password</h1>
            <form onSubmit={onSubmitHandler}>
              <div className="mt-5 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <PersonIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your email Id"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-center items-center">
                <div className="border-2 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <LockIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6 bg-white"
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    value={changepassword}
                    onChange={(e) => setChangepassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Change
              </button>
              
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full md:h-5/6 flex items-center justify-center p-4 md:p-8">
          <img className="rounded-3xl w-full h-full object-cover" src={payimg} alt="Chatting" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;