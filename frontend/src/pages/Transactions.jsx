import { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/getTransactions`,
        {
          withCredentials: true,
        }
      );

      setTransactions(data.transactions || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const groupedTransactions = transactions.reduce((acc, txn) => {
    const year = txn.year;

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(txn);

    return acc;
  }, {});

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Transactions Ledger
      </h1>

      {Object.keys(groupedTransactions)
        .sort((a, b) => b - a)
        .map((year) => {
          const yearTransactions =
            groupedTransactions[year];

          const income = yearTransactions
            .filter((t) => t.type !== "Expense")
            .reduce(
              (sum, t) => sum + t.amount,
              0
            );

          const expense = yearTransactions
            .filter((t) => t.type === "Expense")
            .reduce(
              (sum, t) => sum + t.amount,
              0
            );

          return (
            <div
              key={year}
              className="bg-white shadow rounded-xl mb-8"
            >
              <div className="bg-yellow-500 text-white p-4 rounded-t-xl">
                <h2 className="text-2xl font-bold">
                  Financial Year {year}
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50">
                <div>
                  <strong>Total Income</strong>
                  <br />
                  ₹{income}
                </div>

                <div>
                  <strong>Total Expense</strong>
                  <br />
                  ₹{expense}
                </div>

                <div>
                  <strong>Balance</strong>
                  <br />
                  ₹{income - expense}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">
                        Date
                      </th>
                      <th className="p-3 text-left">
                        Type
                      </th>
                      <th className="p-3 text-left">
                        Member
                      </th>
                      <th className="p-3 text-left">
                        Payment Mode
                      </th>
                      <th className="p-3 text-left">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearTransactions.map((txn) => (
                      <tr
                        key={txn._id}
                        className="border-t"
                      >
                        <td className="p-3">
                          {new Date(
                            txn.date
                          ).toLocaleDateString()}
                        </td>

                        <td className="p-3">
                          {txn.type}
                        </td>

                        <td className="p-3">
                          {txn.member?.name ||
                            "-"}
                        </td>

                        <td className="p-3">
                          {txn.paymentMode}
                        </td>

                        <td
                          className={`p-3 font-semibold ${
                            txn.type === "Expense"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          ₹{txn.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Transactions;