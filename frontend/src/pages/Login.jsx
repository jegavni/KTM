import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login({ setAuth }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );

      setAuth(true);                        // update auth state
      toast.success(res.data.message);      // show success toast
      navigate("/dashboard");               // redirect after login
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);                     // show error toast
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#121212] p-8 rounded-xl shadow-xl w-96 text-white">
        <h3 className="text-2xl font-bold text-center mb-6">Login</h3>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;