import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../contexts/AuthContext";

function Login() {
  const { login } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log(user); // This will now log the user data
      navigate("/"); // Navigate after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 h-[100vh]">
        <div className="bg-neutral-950 h-full flex justify-center  text-white">
          <div className="flex flex-col my-48">
            <img className="w-36 my-8 mx-auto" src="/Twitter-Logo.png" alt="" />
            <h2 className="text-center font-bold text-4xl mb-4">
              Welcome Back, Innovator
            </h2>
            <p className="text-center  mb-4 text-sky-400">
              To use Twitter, please enter your details
            </p>
            <form onSubmit={handleSubmit} className="mt-4" action="">
              <div className="flex flex-col space-y-3 mb-4">
                <label className="font-semibold" htmlFor="email">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="bg-sky-400 py-2 w-full rounded-md transition-all hover:bg-sky-600">
                  Sign In
                </button>
              </div>
              <p className="text-center mt-5 font-semibold">
                Don&apos;t have an account?{" "}
                <Link to={"/register"}>
                  <span className="text-sky-400">Sign up</span>
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            className="w-full h-[100vh] object-cover object-center"
            src="/register.jpeg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Login;
