import React from 'react';

const handleDiscordLogin = () => {
  window.location.href = 'http://localhost:3000/api/auth/discord';
};

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the Vite + React starter template.</p>
      <button onClick={handleDiscordLogin}>Discord</button>
      <button onClick={() => (window.location.href = '/user')}>User Page</button>
      <button onClick={() => (window.location.href = '/admin')}>Admin Page</button>
    </>
  );
}
