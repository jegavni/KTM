import { useState } from "react";
import { Navigate } from "react-router-dom";
import Members from "./Members";
import Events from "./Events";
import Transactions from "./Transactions";
import Minutes from "./Minutes";
import toast from "react-hot-toast";
import axios from "axios";  

function Dashboard({ auth, setAuth }) {
  const [activeTab, setActiveTab] = useState("Members");

  if (!auth) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );

    setAuth(false);
    toast.success("Logged out!");
  } catch (error) {
    console.error(error);
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case "Members":
        return <Members />;
      case "Events":
        return <Events />;
      case "Transactions":
        return <Transactions />;
      case "Minutes":
        return <Minutes />;
      default:
        return <Members />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        {["Members", "Events", "Transactions", "Minutes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mb-2 p-2 rounded text-left hover:bg-gray-700 transition ${
              activeTab === tab ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {tab}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="mt-auto p-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;