import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // For redirecting after logout

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:7002/api/auth/profile", { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        alert("Access denied. Redirecting to login...");
        navigate("/login"); // Redirect to login if not authenticated
      }
    };
    fetchProfile();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.post("http://localhost:7002/api/auth/logout", {},{ withCredentials: true });
      setUser(null);
      navigate("/login"); // Redirect after logout
    } catch (error) {
      alert("Error logging out");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Profile</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
