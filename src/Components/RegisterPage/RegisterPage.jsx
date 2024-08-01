import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Navbar from '../Navbar/Navbar';


auth

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [names, setName] = useState("");
    const handleRegister = async (e) =>{
        e.preventDefault();
        try {
            await await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            
            if(user){
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                     DisplayName:names,
                  });
            }
            console.log(user)
            console.log("user Registered successful")
            toast.success("User Registered Successfully!!", {
                position: "top-center",
              });
            
        } catch (error) {
            console.log(error.message)
            
        }
    }
  return (
    <div>
      <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              value={names}
              onChange={(e)=> setName(e.target.value)}
              id="displayName"
              placeholder="Enter your display name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
