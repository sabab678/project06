import React from 'react'
import api from '../api/axios.js'
import { useState } from 'react'



function Profile() {
    const [msg, setMsg] = useState('')

    const logout = async () => {
        const res = await api.get('/auth/logout')
        setMsg(res.data.message)
    }

  return (
    <div>
      profile

        <button
        onClick={logout}
        className=' m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-30'>
          Logout
        </button>
        <p>{msg}</p>
    </div>
  )
}

export default Profile
