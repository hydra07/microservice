// <<<<<<< HEAD
// "use client";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { selectAuth } from "@/lib/features/auth/authSlice";
// import { useEffect } from "react";

// export default function isAuth(Component: any) {
//   return function IsAuth(props: any) {
//     const router = useRouter();
//     const { isLoggedIn } = useSelector(selectAuth);

//     useEffect(() => {
//       if (!isLoggedIn) {
//         router.push("/");
//         return; // Exit the useEffect hook if not logged in
//       }
//     }, [isLoggedIn, router]);

//     // Render the component if logged in
//     return <Component {...props} />;
//   };
// }
// =======
// import { history } from '@/helpers/history';
// import { selectAuth } from '@/lib/features/auth/authSlice';
// import { useAppSelector } from '@/lib/hooks';
// import { Navigate } from 'react-router-dom';

// const PrivateRouter = ({ children }: { children: JSX.Element }) => {
//   const { isLoggedIn } = useAppSelector(selectAuth);
//   if (!isLoggedIn) {
//     return <Navigate to="/login" state={{ from: history.location }} />;
//   }

//   return children;
// };

// export default PrivateRouter;
// >>>>>>> master
