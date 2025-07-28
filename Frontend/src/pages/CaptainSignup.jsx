import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [color, setColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const { setCaptain } = useContext(CaptainContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const newCaptain = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        vehicleType: vehicleType,
        plate: plate,
        capacity: capacity,
      },
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/signup`,
        newCaptain,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("captainToken", res.data.token);
        setCaptain(res.data.captain);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setColor("");
        setVehicleType("");
        setPlate("");
        setCapacity("");
        navigate("/captain-home");
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
    <div className="p-3 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://pngimg.com/uploads/uber/uber_PNG24.png"
          alt="Uber's logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium pb-2">What's your name</h3>
          <div className="mb-3 flex gap-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
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
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-3 rounded px-5 py-2 w-full text-xl border placeholder:text-base"
            type="email"
            placeholder="Example@example.com"
          />
          <h3 className="text-lg font-medium pb-2">Enter Password</h3>
          <input
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-3 rounded px-3 py-2 w-full text-base border placeholder:text-sm"
            type="password"
            placeholder="Password"
          />
          <h3 className="text-lg font-medium pb-2">Vehicle Details</h3>
          <div className="mb-2 flex gap-2">
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 text-base border placeholder:text-sm"
              type="text"
              placeholder="Color"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 text-base border"
            >
              <option value="">Vehicle Type</option>
              <option value="auto">Auto</option>
              <option value="motorCycle">MotorCycle</option>
              <option value="car">Car</option>
            </select>
          </div>
          <div className="mb-3 flex gap-2">
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 text-base border"
            >
              <option value="">Capacity</option>
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              required
              className="bg-[#eeeeee] w-[48%]  rounded px-5 py-2 text-xl border placeholder:text-base"
              type="text"
              placeholder="Plate"
            />
          </div>
          <button className="bg-[#111] text-white font-semibold w-full mb-4 rounded px-5 py-3">
            Submit
          </button>
        </form>
        <p className="text-center text-lg font-semibold">
          Already have an account?{" "}
          <Link to={"/captain-login"} className="text-blue-500">
            Login
          </Link>{" "}
        </p>
      </div>
      <div className="">
        <Link
          to={"/signup"}
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold w-full  px-5 py-3"
        >
          Sign up as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
