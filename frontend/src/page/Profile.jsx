import React, { useState } from "react";
import api from "../api/axios.js";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [msg, setMsg] = useState("");

  const date = new Date();
  const formattedDate = date.toLocaleDateString('sv-SE');


  const [income, setIncome] = useState({
    date: formattedDate,
    amount: "",
    category: "",
    gainFrom: "",
    note: "",
  });

  const [expenses, setExpenses] = useState({
    date: formattedDate,
    amount: "",
    category: "",
    expensesFrom: "",
    note: "",
  });

  let [balance, setBalance] = useState(null)

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await api.get("/auth/logout");
      setMsg(res.data.message);
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  const submitIncome = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/transaction/income", income);
      console.log(res.data);
      setIncome({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      gainFrom: "",
      note: "",
    });
    } catch (error) {
      console.log(error);
    }
  };

  const submitExpenses = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/transaction/expenses", expenses);
      console.log(res.data);
      
      setExpenses({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      expensesFrom: "",
      note: "",
    });
    } catch (error) {
      console.log(error);
    }
  };

  const balanceAPI = async()=>{
    const res = await api.get('/transaction/balance')
    setBalance(res.data.balance.balance)
  }
  balanceAPI()

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">

      {/* Sidebar */}
      <div className="w-72 bg-slate-800 p-6 flex flex-col rounded-r-3xl shadow-xl">

        <h1 className="text-3xl font-bold mb-10 text-center">
          Finance Tracker
        </h1>

        <Link to='/profile' className="" >
        <button className="bg-[#b4cfed] hover:bg-[#84b0e0] transition rounded-xl py-3 font-semibold mb-5 w-60">
          Profile
        </button>
        </Link>

        <Link to='/history'>
        <button className="bg-[#b4cfed] hover:bg-[#84b0e0] transition rounded-xl py-3 font-semibold mb-5 w-60">
          Monthly report
        </button>
        </Link>

        <button
          onClick={logout}
          className = "bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold">
          Logout
        </button>

        {msg && (
          <p className="mt-5 text-center text-green-400">
            {msg}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-center mb-10">
          Personal Finance Management
        </h1>
        <h1 className="text-4xl font-bold text-center mb-10">
          Balance:  {balance}
        </h1>

        <div className="grid grid-cols-2 gap-10">

          {/* Income Card */}
          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-center mb-8">
              Add Income
            </h2>

            <form
              onSubmit={submitIncome}
              className="flex flex-col gap-5"
            >

              <input
                type="number"
                placeholder="Enter Income"
                value={income.amount}
                onChange={(e) =>
                  setIncome({
                    ...income,
                    amount: e.target.value,
                  })
                }
                className="bg-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={income.gainFrom}
                onChange={(e) =>
                  setIncome({
                    ...income,
                    gainFrom: e.target.value,
                  })
                }
                className="bg-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Mobile Banking">Mobile Banking</option>
              </select>

              <input
                type="text"
                placeholder="Category"
                value={income.category}
                onChange={(e) =>
                  setIncome({
                    ...income,
                    category: e.target.value.toLowerCase(),
                  })
                }
                className="bg-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Write a note..."
                value={income.note}
                onChange={(e) =>
                  setIncome({
                    ...income,
                    note: e.target.value,
                  })
                }
                className="bg-slate-700 p-3 rounded-xl h-40 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold"
              >
                Add Income
              </button>

            </form>

          </div>

          {/* Expenses Card */}
          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-center mb-8">
              Add Expenses
            </h2>

            <form
              onSubmit={submitExpenses}
              className="flex flex-col gap-5"
            >

              <input
                type="number"
                placeholder="Enter Expense"
                value={expenses.amount}
                onChange={(e) =>
                  setExpenses({
                    ...expenses,
                    amount: e.target.value,
                  })
                }
                className="bg-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
              />

              <select
                value={expenses.expensesFrom}
                onChange={(e) =>
                  setExpenses({
                    ...expenses,
                    expensesFrom: e.target.value,
                  })
                }
                className="bg-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Mobile Banking">Mobile Banking</option>
              </select>

              <input
                type="text"
                placeholder="Category"
                value={expenses.category}
                onChange={(e) =>
                  setExpenses({
                    ...expenses,
                    category: e.target.value.toLowerCase(),
                  })
                }
                className="bg-slate-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
              />

              <textarea
                placeholder="Write a note..."
                value={expenses.note}
                onChange={(e) =>
                  setExpenses({
                    ...expenses,
                    note: e.target.value,
                  })
                }
                className="bg-slate-700 p-3 rounded-xl h-40 resize-none outline-none focus:ring-2 focus:ring-red-500"
              />

              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold"
              >
                Add Expense
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;
