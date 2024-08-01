import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);

        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <nav className="bg-green-100 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black  text-2xl font-bold">
            BIG MONEY APP
          </div>
          <div className="flex items-center">
            {userDetails && (
              <p className="text-black mr-4">Hello, {userDetails.DisplayName}</p>
            )}
            <button 
              onClick={handleLogout} 
              className="text-gren-300 border-1 border-green-600 bg-green-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        {!userDetails && (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
