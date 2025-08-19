import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../assets/Login.json";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then((res) => {
        Swal.fire("Success!", "Login successful", "success");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          Swal.fire("User Not Found", "This email is not registered. Please register.", "error");
        } else if (err.code === "auth/wrong-password") {
          Swal.fire("Login Failed", "Email or password is incorrect", "error");
        } else if (err.code === "auth/invalid-credential") {
          Swal.fire("Login Failed", "Invalid credentials. Try again or register.", "error");
        } else {
          Swal.fire("Login Failed", err.message, "error");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl overflow-hidden p-6 md:p-10">
        <Title>Login Now</Title>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-8">
          {/* Login Form */}
          <div className="w-full sm:border-t-2 md:border-none lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6 bg-white bg-opacity-80 rounded-lg shadow-md"
            >
              {/* Email */}
              <div className="flex items-center border-b-2 border-gray-400 focus-within:border-orange-500 transition">
                <BiEnvelope className="text-xl text-gray-600 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  className="flex-1 py-2 bg-transparent outline-none text-gray-800"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center border-b-2 border-gray-400 focus-within:border-orange-500 transition">
                  <BiKey className="text-xl text-gray-600 mr-2" />
                  <input
                    type="password"
                    name="pass"
                    placeholder="Enter password"
                    required
                    className="flex-1 py-2 bg-transparent outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-700">Remember Me</label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full cursor-pointer bg-red-500 disabled:bg-gray-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition duration-300`}
                disabled={loading}
              >
                {loading?<span className="loading loading-spinner loading-lg"></span>:" Login Now"}
              </button>

              {/* Link to Register */}
              <p className="text-center text-sm text-gray-700 pt-4 border-t">
                New to this site?{" "}
                <Link to="/registration" className="text-blue-600 underline hover:text-blue-800">
                  Register
                </Link>
              </p>
            </form>
          </div>

          {/* Animation */}
          <div className="w-full lg:w-1/2 max-w-md">
            <Lottie
              animationData={loginAnimation}
              loop
              className="w-[250px] mx-auto md:w-[350px] lg:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
