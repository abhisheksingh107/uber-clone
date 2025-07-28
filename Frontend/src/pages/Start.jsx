import { Link } from "react-router-dom"

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1104,w_1104/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png)] h-screen w-full pt-7 flex flex-col justify-between">
        <h1 className="text-4xl mb-2 font-bold ml-7">Uber</h1>
        <div className="bg-white px-4 py-5 pb-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to={'/login'}><button className="w-full bg-black text-2xl text-white py-3 rounded mt-5">Continue</button> </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
