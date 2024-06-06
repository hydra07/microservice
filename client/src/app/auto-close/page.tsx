// pages/auto-close.tsx
// 'use client'
// import { useEffect } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation'
// import tokenService from '@/services/token.service';

// const AutoClosePage: React.FC = () => {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   useEffect(() => {
//     const url = `${pathname}?${searchParams}`

//     // const urlParams = new URLSearchParams(router..split('?')[1]);
//     const urlParams = new URLSearchParams(searchParams.toString());
//     const accessToken = urlParams.get('accessToken');
//     const refreshToken = urlParams.get('refreshToken');

//     if (accessToken && refreshToken) {
//       tokenService.saveToken(accessToken, refreshToken);
//       window.opener?.postMessage({ accessToken, refreshToken }, window.origin);
//       // window.close();
//     }
//   }, [usePathname, useSearchParams]); // Include router.isReady in the dependency array

//   return null;
// };

// export default AutoClosePage;
