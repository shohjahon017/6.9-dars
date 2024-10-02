import React, { useEffect, useRef, useState } from "react";
import {
  Route,
  Routes,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, []);

  function ProtectedRoute({ isAthenticated, children }) {
    if (!isAthenticated) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAthenticated={!!token}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  );
}
