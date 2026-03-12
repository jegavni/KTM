import { Link } from "react-router-dom";
import TrustNavbar from "../components/TrustNavbar";
const Home = () => {
  return (
    <>
      <TrustNavbar />

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: "url(https://picsum.photos/1600/900)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative text-center px-6 max-w-3xl">

          <div className="space-y-6 mb-10">

            <div>
              <p className="text-2xl md:text-3xl italic">
                “You have the right to perform your duties,
                but not to the fruits of your actions.”
              </p>

              
              <span className="text-gray-300 text-sm">
                — Bhagavad Gita 2.47
              </span>
            </div>

            <div>
              <p className="text-2xl md:text-3xl italic">
                “Change is the law of the universe.
                One who accepts change is happy.”
              </p>
              <span className="text-gray-300 text-sm">
                — Bhagavad Gita 2.14
              </span>
            </div>

            <div>
              <p className="text-2xl md:text-3xl italic">
                “A person is made by their faith.
                As they believe, so they become.”
              </p>
              <span className="text-gray-300 text-sm">
                — Bhagavad Gita 17.3
              </span>
            </div>

          </div>

          {/* Button */}
          <Link to="/login">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-3 rounded-full font-semibold text-lg transition">
              Enter
            </button>
          </Link>

        </div>
      </div>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">
          About the Trust
        </h3>

        <p className="text-gray-600">
          This Trust Management System is designed to manage members,
          trustees, donations, and expenses with transparency and
          accountability.
        </p>
      </section>
    </>
  );
};

export default Home;