import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  user: {
    id: string;
    role: string;
  };
}

export default function UserPage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/protected', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      {userData ? (
        <div>
          <p>User ID: {userData.user.id}</p>
          <p>Role: {userData.user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
