import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        newUser,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("UserToken", res.data.token);
        setUser(res.data.user);
        setFirstName("");
        setLastName("");
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
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <h1 className="text-4xl mb-7 font-bold">Uber</h1>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-medium pb-2">What's your name</h3>
            <div className="mb-5 flex gap-4">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 rounded px-5 py-2 text-xl border placeholder:text-base"
                type="text"
                placeholder="First name"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 rounded px-5 py-2 text-xl border placeholder:text-base"
                type="text"
                placeholder="Last name"
              />
            </div>
            <h3 className="text-lg font-medium pb-2">What's your email</h3>
            <input
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#eeeeee] mb-5 rounded px-5 py-2 w-full text-xl border placeholder:text-base"
              type="email"
              placeholder="Example@example.com"
            />
            <h3 className="text-lg font-medium pb-2">Enter Password</h3>
            <input
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#eeeeee] mb-7 rounded px-5 py-2 w-full text-xl border placeholder:text-base"
              type="password"
              placeholder="Password"
            />
            <button className="bg-[#111] text-white font-semibold w-full mb-4 rounded px-5 py-3">
              Submit
            </button>
          </form>
          <p className="text-center text-lg font-semibold">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500">
              Login here
            </Link>{" "}
          </p>
        </div>
        <div className="">
          <Link
            to={"/captain-signup"}
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold w-full  px-5 py-3"
          >
            Sign up as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
