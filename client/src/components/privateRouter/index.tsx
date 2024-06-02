"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/lib/features/auth/authSlice";
import { useEffect } from "react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const { isLoggedIn } = useSelector(selectAuth);

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/");
        return; // Exit the useEffect hook if not logged in
      }
    }, [isLoggedIn, router]);

    // Render the component if logged in
    return <Component {...props} />;
  };
}