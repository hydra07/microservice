import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/lib/hooks";
import { selectAuth } from "@/lib/features/auth/authSlice";
import { history } from "@/helpers/history";


const PrivateRouter = ({ children }: { children: JSX.Element }) => {
    const {isLoggedIn} = useAppSelector(selectAuth);
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    return children;
};

export default PrivateRouter;