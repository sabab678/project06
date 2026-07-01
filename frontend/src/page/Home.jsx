import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Home() {



  return (
    <>
      <div className= 'flex justify-center items-center h-screen w-screen'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-30'>
          <Link to="/register">Register</Link>
        </button>

        <button className=' m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-30'>
          <Link to="/login">Login</Link>
        </button>



      </div>

    </>
  )
}

export default Home
