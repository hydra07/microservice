import useAuth from "@/hooks/useAuth";
import Loading from "./Loading";
import ErrorAccessDenied from "./error/ErrorAccessDenied";
import { ReactNode, useEffect } from "react";
import { useAuthFormToggle } from "@/hooks/useAuthFormToggle";

const AdminWrapper = ({
  children,
  handlePage,
}: Readonly<{ children: ReactNode; handlePage?: ReactNode }>) => {
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
  if (user.role !== "admin")
    return handlePage ? (
      handlePage
    ) : (
      <ErrorAccessDenied
        status={status}
        message="You must be an admin to access this page."
      />
    );
  return <>{children}</>;
};

export default AdminWrapper;
