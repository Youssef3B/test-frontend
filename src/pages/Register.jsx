import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handlSubmit(e) {
    e.preventDefault();
    const data = { fullName, userName, email, password };
    try {
      const url = "https://test-deploy-api-0e9g.onrender.com/api/auth/register";
      const res = await axios.post(url, data);
      if (res) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:block">
          <img
            className="w-full h-[100vh] object-cover object-center"
            src="/login.jpeg"
            alt=""
          />
        </div>
        <div className="bg-neutral-950 h-full flex justify-center  text-white">
          <div className="flex flex-col my-24">
            <img className="w-36 my-8 mx-auto" src="/Twitter-Logo.png" alt="" />
            <h2 className="text-center font-bold text-4xl mb-4">
              Create a new account
            </h2>
            <p className="text-center  mb-4 text-sky-400">
              To use Twitter, please enter your details
            </p>
            <form onSubmit={handlSubmit} className="mt-4" action="">
              <div className="flex flex-col space-y-3 mb-4">
                <label className="font-semibold" htmlFor="userName">
                  FullName
                </label>
                <input
                  className="bg-neutral-700 p-2 rounded-md border-none outline-none"
                  type="text"
                  placeholder="Daniel Park"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-3 mb-4">
                <label className="font-semibold" htmlFor="userName">
                  UserName
                </label>
                <input
                  className="bg-neutral-700 p-2 rounded-md border-none outline-none"
                  type="text"
                  placeholder="Daniel Park"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-3 mb-4">
                <label className="font-semibold" htmlFor="userName">
                  Email
                </label>
                <input
                  className="bg-neutral-700 p-2 rounded-md border-none outline-none"
                  type="text"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-3 mb-6 lg:w-[500px]">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="bg-neutral-700 p-2 rounded-md border-none outline-none"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="bg-sky-400 py-2 w-full rounded-md transition-all hover:bg-sky-600">
                  Sign In
                </button>
              </div>
              {/* {Error && (
                <div>
                  <h4 className="text-red-600 font-bold">
                    Something went wrong
                  </h4>
                </div>
              )} */}
              <p className="text-center mt-5 font-semibold">
                Already have an account ?
                <Link to={"/login"}>
                  <span className="text-sky-400"> Sign up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
