import React from 'react'
import { Link, useNavigate } from "react-router-dom";


function History() {


    // const dateISOS = new Date().toISOString().split("T")[0]
    // const date = new Date()

    // const lastDay = date.setDate(date.getDate() - 20);

    // console.log(date)
    // console.log(lastDay)
    // console.log(dateISOS)


    const logout = async () => {
        try {
            const res = await api.get("/auth/logout");
            setMsg(res.data.message);
            navigate("/register");
        } catch (error) {
            console.log(error);
        }
    };

    const date = new Date();
    date.setDate(date.getDate() - 30);

    // Formats perfectly to YYYY-MM-DD using the Swedish locale trick
    const formattedDate = date.toLocaleDateString('sv-SE');

    console.log(formattedDate);
    // Output: "2026-06-17"


    return (
        <>
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
                        className="bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold">
                        Logout
                    </button>


                </div>
            </div>

        </>
    )
}

export default History
