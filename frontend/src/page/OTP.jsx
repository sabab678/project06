import { useState, useEffect } from "react";
import api from '../api/axios.js'
import {useNavigate} from 'react-router-dom'


function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(30);

  const navigate = useNavigate()

    useEffect(() => {

    if (time === 0) {
      const res = api.get('/auth/notGivenOTP')
      navigate('/')
    };


    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);


    return () => clearInterval(timer);

  }, [time]);


  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const verifyOTP = async () => {
    const finalOTP = otp.join("");
    console.log("OTP:", finalOTP);
    try{
      const res = await api.post('/auth/otp',{otp:finalOTP})
      console.log(res.data)
      navigate('/login')
    }catch(error){ 
      console.log(error)
    }
      
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">

      <div className="bg-[#282b29] w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-3">
          Verify OTP
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter the 6 digit code sent to your email
        </p>


        <div className="flex justify-center gap-3 mb-8">

          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e)=>handleChange(e.target.value,index)}
              className="
                w-12 h-12
                text-center
                text-xl
                font-bold
                border
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          ))}

        </div>


        <button
          onClick={verifyOTP}
          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-blue-700
            transition
          "
        >
          Verify OTP
        </button>


        <p className="text-center text-sm text-gray-500 mt-5">
          Didn't receive code?
          <span className="text-blue-600 cursor-pointer ml-1">
            Resend
          </span>
        </p>
          <div>{time}</div>
      </div>

    </div>
  );
}

export default OTP
