import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isStrongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword) {
      return alert("Please enter a strong password");
    }

    if (!passwordsMatch) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      alert("Password reset successful");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition
                ${
                  password.length === 0
                    ? "border-gray-300"
                    : isStrongPassword
                    ? "border-green-500"
                    : "border-red-500"
                }`}
            />

            {password.length > 0 && (
              <p
                className={`mt-2 text-sm ${
                  isStrongPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {isStrongPassword
                  ? "✓ Strong password"
                  : "Must contain 8+ characters, uppercase, lowercase, number and special character"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg outline-none transition
                ${
                  confirmPassword.length === 0
                    ? "border-gray-300"
                    : passwordsMatch
                    ? "border-green-500"
                    : "border-red-500"
                }`}
            />

            {confirmPassword.length > 0 && (
              <p
                className={`mt-2 text-sm ${
                  passwordsMatch
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isStrongPassword || !passwordsMatch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;