"use client"
import useAuth from "@/hooks/useAuth";
import { useAuthFormToggle } from "@/hooks/useAuthFormToggle";
import { ReactNode, useEffect } from "react";
import Loading from "./Loading";
import ErrorAccessDenied from "./error/ErrorAccessDenied";

const UserWrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { user, status } = useAuth();
  const { setIsOpen } = useAuthFormToggle();
  useEffect(() => {
    console.log(user, status);
    if (!user && status === "unauthenticated") {
      setIsOpen(true);
    }
  }, [user, setIsOpen, status]);
  if (status === "loading") return <Loading />;
  if (!user)
    return (
      <ErrorAccessDenied
        status={status}
        message="You must be logged in to access this page."
      />
    );
  return <>{children}</>;
};

export default UserWrapper;
