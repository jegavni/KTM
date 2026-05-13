import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

function Login({ setAuth }) {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );

      console.log("Login Response:", res.data);

      // Immediately verify auth after login
      const check = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check`
      );

      console.log("Auth Check:", check.data);

      if (check.data.loggedIn) {
        setAuth(true);

        toast.success(
          res.data.message || "Login successful"
        );

        navigate("/dashboard");
      } else {
        toast.error("Cookie/token not received");
      }

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#121212] p-8 rounded-xl shadow-xl w-96 text-white">
        <h3 className="text-2xl font-bold text-center mb-6">
          Login
        </h3>

        <form onSubmit={login} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg"
            value={data.email}
            onChange={(e)=>
              setData({
                ...data,
                email:e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg"
            value={data.password}
            onChange={(e)=>
              setData({
                ...data,
                password:e.target.value
              })
            }
            required
          />

          <Link
            to="/forgotPassword"
            className="text-blue-400 hover:underline text-sm"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg ${
              loading
                ? "bg-gray-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;