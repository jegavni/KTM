import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );

      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#121212] p-8 rounded-xl shadow-xl w-96 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg mb-4"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;