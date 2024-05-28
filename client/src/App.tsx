// import { ThemeProvider } from '@/components/theme-provider';
// import { RouterProvider } from 'react-router-dom';
// import './App.css';
// import router from './configs/router.config';
// function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
//     </ThemeProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";
import AutoCloseComponent from "./components/ui/AutoClose";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/user">User Page</Link>
          <Link to="/admin">Admin Page</Link>
        </nav>
        <Routes>
          <Route path="/auto-close" element= {<AutoCloseComponent/>}>
           
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
