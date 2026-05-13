import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import axios from "axios";

const TrustNavbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const links = [
    { name: "Includes", path: "/includes" },
    { name: "Minutes", path: "/minutes" },
    { name: "Members", path: "/members" },
    { name: "Transactions", path: "/transactions" },
    { name: "Events", path: "/events" },
    { name: "Profile", path: "/profile" },
  ];

  const handleNavigation = async (path) => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        navigate(path);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav
      className="
        fixed top-0 w-full z-50
        bg-black/30 backdrop-blur-xl
        border-b border-white/10
        shadow-xl
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1
            className="
              text-2xl font-extrabold
              bg-gradient-to-r
              from-yellow-300
              to-yellow-500
              bg-clip-text
              text-transparent
              drop-shadow-lg
              transition duration-500
              group-hover:scale-110
            "
          >
            KETM
          </h1>

          <div
            className="
              h-[2px]
              bg-yellow-400
              w-0
              group-hover:w-full
              transition-all
              duration-700
            "
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3">
          {links.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              disabled={loading}
              className="
                relative
                px-5 py-2
                rounded-xl
                bg-white/5
                border border-transparent
                backdrop-blur-sm
                hover:border-yellow-400/40
                hover:bg-white/10
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-yellow-400/20
                transition-all
                duration-500
                overflow-hidden
                group
              "
            >
              <span className="relative z-10">
                {item.name}
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-yellow-400
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="
            md:hidden
            bg-white/10
            p-2
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Glow Effect */}
      <div
        className="
          absolute
          -bottom-10
          left-1/2
          -translate-x-1/2
          w-96
          h-16
          bg-yellow-500/10
          blur-3xl
        "
      />
    </nav>
  );
};

export default TrustNavbar;