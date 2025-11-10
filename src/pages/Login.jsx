import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loginAnim from "../lotties/login.json";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Handle email/password login
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        setSuccess("Login successful!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Google User:", result.user);
        setSuccess("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-base-200 p-5">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie animationData={loginAnim} loop={true} className="w-3/4" />
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Error / Success */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>

        {/* Redirect to Register */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>

        {/* Google Login */}
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-accent w-full flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
