import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios.js'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const [msg,setMsg] = useState('')

   const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  } 

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await api.post('/auth/register',user)
      console.log(res.data)
      setMsg(res.data.message)

      navigate('/otp')
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className='flex justify-center items-center h-screen w-screen'>
      <div className='w-160 h-120 bg-gray-600 flex justify-center items-center rounded-3xl'>
        <form onSubmit={handleSubmit} >
          
          <input 
          type="text"
           placeholder='User Name' 
           name="userName"
           value={user.userName} 
           onChange ={handleChange}
           className='m-5 p-2 rounded-lg' />


          <input 
          type="email"
            placeholder='Email'
            name="email"
            value={user.email}
            onChange ={handleChange}
            className='m-5 p-2 rounded-lg' />


          <input 
          type="password"
            placeholder='Password'
            name="password"
            value={user.password}
            onChange ={handleChange}
            className='m-5 p-2 rounded-lg' />

          <button type='submit'>
            submit
          </button>


        </form>
        <p>{msg}</p>
      </div>
    </div>
    </div>
  )
}

export default Register
