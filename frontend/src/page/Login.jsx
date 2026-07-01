import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'


function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const loadPage = async () => {
    
    try {
      const res = await api.post('/auth/login',user)
      console.log(res.data)
      setMsg(res.data.message)
      if(res.data.message === "Already logged in"){
        navigate('/profile')
      }else if(res.data.message === "login successfull"){
        navigate('/profile')
      }


    } catch (error) {
      console.log("error in load page", error)
    }
  }

  useEffect(() => {
    loadPage()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loadPage()
  }



  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>

        <div className='flex justify-center items-center h-80 w-120 bg-[#57545c]'>
          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder='Email'
              name="email"
              value={user.email}
              onChange={handleChange}
              className='m-5 p-2 rounded-lg' />


            <input
              type="password"
              placeholder='Password'
              name="password"
              value={user.password}
              onChange={handleChange}
              className='m-5 p-2 rounded-lg' />

            <button type='submit' className='w-20 h-10 bg-blue-500 rounded-3xl'>
              submit
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login
