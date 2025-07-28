import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const captainData = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData,
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        localStorage.setItem("captainToken", res.data.token);
        setCaptain(res.data.captain);
        setEmail("");
        setPassword("");
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-30 mb-5"
          src="https://pngimg.com/uploads/uber/uber_PNG24.png"
          alt="Uber's logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium pb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-7 rounded px-3 py-2 w-full text-xl border placeholder:text-base"
            type="email"
            placeholder="Example@example.com"
          />
          <h3 className="text-lg font-medium pb-2">Enter Password</h3>
          <input
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-5 rounded px-3 py-2 w-full text-xl border placeholder:text-base"
            type="password"
            placeholder="Password"
          />
          <button className="bg-[#111] text-white font-semibold w-full mb-3 rounded px-5 py-3">
            Login
          </button>
        </form>
        <p className="text-center text-lg font-semibold">
          Join a fleet?{" "}
          <Link to={"/captain-signup"} className="text-blue-500">
            Register as a Captain
          </Link>{" "}
        </p>
      </div>
      <div className="">
        <Link
          to={"/login"}
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold w-full  px-5 py-3"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
