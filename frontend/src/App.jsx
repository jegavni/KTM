import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Includes from "./pages/Includes";
import Minutes from "./pages/Minutes";
import Members from "./pages/Members";
import Transactions from "./pages/Transactions";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import axios from "axios";

function App() {

const [auth, setAuth] = useState(false);
 useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/check", {
          withCredentials: true,
        });
        if (res.data.loggedIn) setAuth(true);
        console.log("Auth Check:", res.data);
      } catch (err) {
        setAuth(false);
      }
    };
    checkUser();
  }, []);


  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route 
  path="/login" 
  element={auth ? <Dashboard auth={auth} setAuth={setAuth} /> : <Login setAuth={setAuth} />} 
/>
        <Route path="/includes" element={<Includes />} />
        <Route path="/minutes" element={<Minutes />} />
        <Route path="/members" element={<Members />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<Dashboard auth={auth} setAuth={setAuth} />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;