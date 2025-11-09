import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import registerAnim from "../lotties/login.json";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setError("");
    setSuccess("");

    // ✅ Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 1 uppercase, 1 lowercase letter, and be 6+ characters long."
      );
      return;
    }

    // ✅ Create user in Firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("New User:", user);
        setSuccess("Account created successfully!");

        // ✅ Update user profile
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => console.log("Profile updated"))
          .catch((err) => console.error(err.message));

        form.reset();
        navigate("/"); // Redirect to homepage
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Google User:", result.user);
        setSuccess("Logged in with Google!");
        navigate("/");
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
        <Lottie animationData={registerAnim} loop={true} className="w-3/4" />
      </div>

      {/* Register Form */}
      <div className="w-full lg:w-1/2 max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
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
            <label className="label text-xs text-gray-500">
              Must include 1 uppercase, 1 lowercase & be 6+ characters
            </label>
          </div>

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Register</button>
          </div>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login here
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

export default Register;
