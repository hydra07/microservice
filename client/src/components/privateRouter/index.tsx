import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectAuth } from "@/features/authSlice";
import { history } from "@/helpers/history";


const PrivateRouter = ({ children }: { children: JSX.Element }) => {
    const {isLoggedIn} = useAppSelector(selectAuth);
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    return children;
};

export default PrivateRouter;