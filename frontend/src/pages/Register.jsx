import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Register() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "member",
    password: ""
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const regex = {
    name: /^[a-zA-Z ]{2,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{10}$/,
    location: /^.{2,50}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
  };

  const handleChange = (key, value) => {

    setData({ ...data, [key]: value });

    let error = "";

    if (!value.trim()) {
      error = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    } 
    else if (regex[key] && !regex[key].test(value)) {
      error = `Invalid ${key}`;
    }

    setErrors({ ...errors, [key]: error });
  };

  const handleImage = (e) => {

    const image = e.target.files[0];

    if (!image) {
      setErrors({ ...errors, file: "Profile picture is required" });
      return;
    }

    setFile(image);
    setPreview(URL.createObjectURL(image));
    setErrors({ ...errors, file: "" });
  };

  const validateAll = () => {

    const newErrors = {};

    Object.keys(data).forEach((key) => {

      if (!data[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      } 
      else if (regex[key] && !regex[key].test(data[key])) {
        newErrors[key] = `Invalid ${key}`;
      }

    });

    if (!file) {
      newErrors.file = "Profile picture is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const register = async (e) => {

    e.preventDefault();

    if (!validateAll()) return;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("profilePic", file);

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL.trim()}/api/auth/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Backend Response:", res.data);

      toast.success("Registered successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      console.error(err.response?.data || err);

      toast.error(err.response?.data?.message || "Registration failed ❌");

    }

  };

  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">

      <div className="grid grid-cols-2 w-full max-w-5xl bg-gray-800 rounded-2xl overflow-hidden shadow-lg">

        {/* Left Section */}

        <div className="p-10 text-white bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold mb-4">Smart Trust Management</h1>
            <p className="text-gray-400 mb-6">
              Manage members, events, minutes and transactions
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1551281044-8b9a2c1d8a5d"
            alt="Illustration"
            className="rounded-xl"
          />

        </div>

        {/* Right Section */}

        <div className="p-10 text-white">

          <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

          <form onSubmit={register} className="space-y-4">

            {/* Profile Preview */}

            <div className="flex justify-center mb-2">

              {preview ? (

                <img
                  src={preview}
                  alt="preview"
                  className={`w-24 h-24 rounded-full object-cover border-2 ${
                    errors.file ? "border-red-500" : "border-blue-500"
                  }`}
                />

              ) : (

                <div
                  className={`w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 border-2 ${
                    errors.file ? "border-red-500" : "border-gray-600"
                  }`}
                >
                  Photo
                </div>

              )}

            </div>

            <input
              type="file"
              onChange={handleImage}
              className="w-full text-sm text-gray-400"
            />

            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file}</p>
            )}

            {/* Inputs */}

            {["name", "email", "phone", "location"].map((key) => (

              <div key={key}>

                <input
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className={`w-full p-3 rounded-lg bg-gray-700 border ${
                    errors[key] ? "border-red-500" : "border-gray-600"
                  } text-white`}
                  onChange={(e) => handleChange(key, e.target.value)}
                />

                {errors[key] && (
                  <p className="text-red-500 text-sm">{errors[key]}</p>
                )}

              </div>

            ))}

            {/* Password */}

            <div>

              <input
                type="password"
                placeholder="Password"
                className={`w-full p-3 rounded-lg bg-gray-700 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } text-white`}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              {errors.password ? (

                <p className="text-red-500 text-sm">{errors.password}</p>

              ) : data.password ? (

                <p
                  className={`text-sm ${
                    regex.password.test(data.password)
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  Password must be 8+ chars with uppercase, lowercase, number & special char
                </p>

              ) : null}

            </div>

            {/* Role */}

            <select
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
              value={data.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

            {/* Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>

          </form>

        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>

  );
}

export default Register;