import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios.js'

const CATEGORIES = [
    { key: "incomeCash", type: "income" },
    { key: "incomeCard", type: "income" },
    { key: "incomeMobileBanking", type: "income" },
    { key: "expensesCash", type: "expense" },
    { key: "expensesCard", type: "expense" },
    { key: "expensesMobileBanking", type: "expense" },
];

function History() {

    let [data, setData] = useState(null)
    const [dates, setDates] = useState([])
    const [balance,setBalance] = useState(null)

    const date = new Date();
    const eDate = new Date()
    date.setDate(date.getDate() - 30);

    const startDate = date.toLocaleDateString('sv-SE');
    const endDate = eDate.toLocaleDateString('sv-SE');

    useEffect(() => {

        const loadPage = async () => {
            const res = await api.post('/transaction/everydayTransaction', { startingDate: startDate, endingDate: endDate })
            setData(res.data)
            const balanceRes = await api.get('/transaction/balance')
            setBalance(balanceRes.data.balance.balance)

            function getDateArray(startDate, endDate) {
                const arr = [];
                const current = new Date(startDate);
                const last = new Date(endDate);

                while (current <= last) {
                    arr.push(current.toLocaleDateString('sv-SE'));
                    current.setDate(current.getDate() + 1);
                }

                return arr;
            }

            setDates(getDateArray(startDate, endDate))
        }

        loadPage()

    }, [])

    // Build { date: amount } lookup maps for each of the 6 arrays
    const lookups = React.useMemo(() => {
        const result = {};
        CATEGORIES.forEach(({ key }) => {
            const map = {};
            (data?.[key] || []).forEach((item) => {
                map[item.date] = item.amount;
            });
            result[key] = map;
        });
        return result;
    }, [data]);

    const getAmount = (categoryKey, day) => {
        return lookups[categoryKey]?.[day] ?? 0;
    };

    const logout = async () => {
        try {
            const res = await api.get("/auth/logout");
            setMsg(res.data.message);
            navigate("/register");
        } catch (error) {
            console.log(error);
        }
    };

    if(balance !== null){
        console.log(balance)

    }

    return (
        <>
            <div className="min-h-screen bg-slate-900 text-white flex">
                {/* Sidebar unchanged */}
                <div className="w-72 bg-slate-800 p-6 flex flex-col rounded-r-3xl shadow-xl">
                    <h1 className="text-3xl font-bold mb-10 text-center">
                        Finance Tracker
                    </h1>
                    <Link to='/profile'>
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
                        className="bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold">
                        Logout
                    </button>
                </div>

                <div>
                    <div className='flex justify-center'>
                        <p className='text-3xl '>Last 30 days transaction</p>

                    </div>
                        <div className='ml-60 text-3xl'>Balance: {balance}</div>
                    <div className="mt-8 px-6">
                        <div className="overflow-x-auto rounded-2xl border border-slate-700 shadow-2xl">
                            <table className="min-w-full text-sm text-slate-200">
                                <thead className="bg-slate-800">
                                    <tr className="border-b border-slate-700">
                                        <th rowSpan={2} className="px-6 py-4 text-left font-bold uppercase border-r border-slate-700">
                                            Date
                                        </th>
                                        <th colSpan={3} className="px-6 py-4 text-center text-green-400 font-bold border-r border-slate-700">
                                            Income
                                        </th>
                                        <th colSpan={3} className="px-6 py-4 text-center text-red-400 font-bold">
                                            Expenses
                                        </th>
                                    </tr>
                                    <tr className="bg-slate-900 border-b border-slate-700">
                                        <th className="px-5 py-3 text-center">Cash</th>
                                        <th className="px-5 py-3 text-center">Card</th>
                                        <th className="px-5 py-3 text-center border-r border-slate-700">Mobile Banking</th>
                                        <th className="px-5 py-3 text-center">Cash</th>
                                        <th className="px-5 py-3 text-center">Card</th>
                                        <th className="px-5 py-3 text-center">Mobile Banking</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dates.map((day) => (
                                        <tr key={day} className="border-b border-slate-800 hover:bg-slate-800/50">
                                            <td className="px-6 py-3 border-r border-slate-700">{day}</td>

                                            <td className="px-5 py-3 text-center">{getAmount("incomeCash", day)}</td>
                                            <td className="px-5 py-3 text-center">{getAmount("incomeCard", day)}</td>
                                            <td className="px-5 py-3 text-center border-r border-slate-700">{getAmount("incomeMobileBanking", day)}</td>

                                            <td className="px-5 py-3 text-center">{getAmount("expensesCash", day)}</td>
                                            <td className="px-5 py-3 text-center">{getAmount("expensesCard", day)}</td>
                                            <td className="px-5 py-3 text-center">{getAmount("expensesMobileBanking", day)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History













