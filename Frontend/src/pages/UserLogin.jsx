import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [Error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("UserToken", res.data.token);
        setUser(res.data.user);
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (err) {
      setError(
        err?.response?.data?.errors?.[0] ||
          err?.response?.data?.message ||
          "SignUp Failed"
      );
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-4xl mb-7 font-bold">Uber</h1>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium pb-2">What's your email</h3>
          <input
            autoComplete="username"
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
          New here?{" "}
          <Link to={"/signup"} className="text-blue-500">
            Create new account
          </Link>{" "}
        </p>
      </div>
      <div className="">
        <Link
          to={"/captain-login"}
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold w-full  px-5 py-3"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
