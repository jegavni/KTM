import { useEffect, useState } from "react";
import axios from "axios";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/members`)
      .then((res) => setMembers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Team Members</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/4 p-3 bg-black text-white border">Name</th>
              <th className="w-1/4 p-3 bg-black text-white border">Position</th>
              <th className="w-1/4 p-3 bg-black text-white border">Location</th>
              <th className="w-1/4 p-3 bg-black text-white border">Compliments</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="text-center hover:bg-gray-50">
                <td className="p-3 border">{member.name}</td>
                <td className="p-3 border">{member.position}</td>
                <td className="p-3 border">{member.location}</td>
                <td className="p-3 border">{member.compliments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}