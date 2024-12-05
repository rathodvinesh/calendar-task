import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import Register from "./components/Login/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import auth from "../../backend/config/firebase";
import { ToastContainer } from "react-toastify";

function App() {
  // const [count, setCount] = useState(0);
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <LoginForm />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ToastContainer />
      </Router>
      {/* <LoginForm /> */}
    </>
  );
}

export default App;
