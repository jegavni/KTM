import { Link } from "react-router-dom";
import TrustNavbar from "../components/TrustNavbar";
const Home = () => {
  return (
    <>
      <TrustNavbar />

{/* Organization Structure */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16">
      Organizational Structure
    </h2>

    <div className="flex flex-col items-center">

      {/* President */}
      <div className="flex flex-col items-center">
        <img
          src="/president.jpg"
          alt="President"
          className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
        />
        <h3 className="mt-3 text-xl font-bold">President Name</h3>
        <p className="text-yellow-600 font-medium">President</p>
      </div>

      <div className="w-1 h-12 bg-gray-400"></div>

      {/* Vice Presidents */}
      <div className="hidden md:block w-96 h-1 bg-gray-400"></div>

      <div className="grid md:grid-cols-2 gap-16 mt-6">
        <div className="flex flex-col items-center">
          <img
            src="/vp1.jpg"
            alt="Vice President"
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow"
          />
          <h4 className="mt-3 font-semibold">Vice President 1</h4>
          <p className="text-gray-500">Vice President</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/vp2.jpg"
            alt="Vice President"
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow"
          />
          <h4 className="mt-3 font-semibold">Vice President 2</h4>
          <p className="text-gray-500">Vice President</p>
        </div>
      </div>

      <div className="w-1 h-12 bg-gray-400 mt-6"></div>

      {/* Secretary Level */}
      <div className="grid md:grid-cols-3 gap-10">

        <div className="flex flex-col items-center">
          <img
            src="/secretary.jpg"
            alt="Secretary"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
          />
          <h4 className="mt-2 font-semibold">Secretary Name</h4>
          <p className="text-gray-500">Secretary</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/joint-secretary.jpg"
            alt="Joint Secretary"
            className="w-24 h-24 rounded-full object-cover border-4 border-green-400"
          />
          <h4 className="mt-2 font-semibold">Joint Secretary</h4>
          <p className="text-gray-500">Joint Secretary</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/treasurer.jpg"
            alt="Treasurer"
            className="w-24 h-24 rounded-full object-cover border-4 border-red-400"
          />
          <h4 className="mt-2 font-semibold">Treasurer Name</h4>
          <p className="text-gray-500">Treasurer</p>
        </div>

      </div>

      <div className="w-1 h-12 bg-gray-400 mt-8"></div>

      {/* Executive Committee */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
        <h3 className="text-2xl font-bold text-center mb-8">
          Executive Committee Members
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "Member 1",
            "Member 2",
            "Member 3",
            "Member 4",
            "Member 5",
            "Member 6",
            "Member 7",
            "Member 8",
          ].map((member) => (
            <div key={member} className="text-center">
              <img
                src="/default-avatar.jpg"
                alt={member}
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-300"
              />
              <h5 className="mt-2 font-medium">{member}</h5>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>
 
    </>
  );
};

export default Home;