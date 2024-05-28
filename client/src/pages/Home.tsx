import React from 'react';
import LoginModal from '@/components/ui/LoginModal';
// const handleDiscordLogin = () => {
//   window.location.href = 'http://localhost:3000/api/auth/discord';
// };

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      {/* <button onClick={handleDiscordLogin}>Login with Discord</button> */}
      <LoginModal />
    </>
  );
}
