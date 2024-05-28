import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginDiscordAsync } from "@/features/authSlice";

const LoginModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginDiscordAsync());
    setShowModal(false); // Đóng modal sau khi bắt đầu quá trình xác thực
  };

  return (
    <>
      <button
        className="bg-indigo-500 text-white py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Login with Discord
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-4">
              Login with Discord
            </h2>
            <button
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transition duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
            {auth.error && (
              <p className="text-red-500 text-center mt-4">{auth.error}</p>
            )}
            <button
              className="mt-4 w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;