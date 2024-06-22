import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const Regis = lazy(() => import("./Pages/Auth/Regis"));
const Reset = lazy(() => import("./Pages/Auth/Reset"));
const NotFound = lazy(() => import("./Pages/Errors/NotFound"));

function App() {
  const [user, setUser] = useState({
    // name: "",
    // email: "",
    // role: "",
    name: "Asror",
    email: "qobulovasror0@gmail.com",
    role: "Admin",
  });
  // const [token, setToken] = useState(window.localStorage.getItem("user-auth"));
  const [token, setToken] = useState("window.localStorage.getItem");
  return (
    <Suspense fallback={<>Loading</>}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Home user={user} setUser={setUser} setToken={setToken} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !token ? (
                <Login setToken={setToken} setUser={setUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/regis"
            element={
              !token ? (
                <Regis setToken={setToken} setUser={setUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reset"
            element={
              !token ? (
                <Reset setToken={setToken} setUser={setUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
