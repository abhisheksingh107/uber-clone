import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName: {
        firstName: '',
        lastName: '',
      },
      email: email,
      password: password
    })
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  console.log(captainData);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-30 mb-5" src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="Uber's logo" />
        <form onSubmit={submitHandler}>

          <h3 className="text-lg font-medium pb-2">What's your name</h3>
          <div className="mb-5 flex gap-4">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="bg-[#eeeeee] w-1/2 rounded px-5 py-2 text-xl border placeholder:text-base" type="text" placeholder="First name" />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-[#eeeeee] w-1/2 rounded px-5 py-2 text-xl border placeholder:text-base" type="text" placeholder="Last name" />
          </div>
          <h3 className="text-lg font-medium pb-2">What's your email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-[#eeeeee] mb-5 rounded px-5 py-2 w-full text-xl border placeholder:text-base" type="email" placeholder="Example@example.com" />
          <h3 className="text-lg font-medium pb-2">Enter Password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-[#eeeeee] mb-7 rounded px-5 py-2 w-full text-xl border placeholder:text-base" type="password" placeholder="Password" />
          <button className="bg-[#111] text-white font-semibold w-full mb-4 rounded px-5 py-3">Submit</button>
        </form>
        <p className="text-center text-lg font-semibold">Already have an account? <Link to={'/captain-login'} className="text-blue-500">Login</Link> </p>
      </div>
      <div className="">
        <Link to={'/signup'} className="bg-[#d5622d] flex items-center justify-center text-white font-semibold w-full  px-5 py-3">Sign up as User</Link>
      </div>
    </div>
  )
}

export default CaptainSignup
