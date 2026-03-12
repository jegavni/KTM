import { Link } from "react-router-dom";

const TrustNavbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-yellow-400">
          Trust System
        </h1>

        {/* Menu */}
        <div className="flex space-x-6">

          <Link
            to="/includes"
            className="hover:text-yellow-400 transition"
          >
            Includes
          </Link>

          <Link
            to="/minutes"
            className="hover:text-yellow-400 transition"
          >
            Minutes
          </Link>

          <Link
            to="/members"
            className="hover:text-yellow-400 transition"
          >
            Members
          </Link>

          <Link
            to="/transactions"
            className="hover:text-yellow-400 transition"
          >
            Transactions
          </Link>

          <Link
            to="/events"
            className="hover:text-yellow-400 transition"
          >
            Events
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default TrustNavbar;