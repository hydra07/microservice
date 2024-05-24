import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AdminData {
  user: {
    id: string;
    role: string;
  };
}

export default function AdminPage() {
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/protected', { withCredentials: true })
      .then(response => {
        setAdminData(response.data);
      })
      .catch(error => {
        console.error('Error fetching admin data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {adminData ? (
        <div>
          <p>User ID: {adminData.user.id}</p>
          <p>Role: {adminData.user.role}</p>
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}
    </div>
  );
}
