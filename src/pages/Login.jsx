import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight, FaEye, FaEyeSlash, FaFacebook, FaGithub, FaUserShield } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import instance from "../hook/useAxios";
import loginAnim from "../lotties/login.json";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { user, setLoading, signInUser, googleLogin, githubLogin, facebookLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Welcome back! 🚀", {
          style: {
            borderRadius: '1rem',
            background: '#333',
            color: '#fff',
          },
        });
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        let message = "Login failed. Please try again.";
        if (err.code === 'auth/invalid-credential') message = "Invalid email or password.";
        if (err.code === 'auth/user-not-found') message = "Account not found.";
        if (err.code === 'auth/wrong-password') message = "Wrong password.";
        if (err.code === 'auth/too-many-requests') message = "Too many attempts. Try later.";
        
        toast.error(message, {
          style: { borderRadius: '1rem' },
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSocialLogin = (method) => {
    setIsSubmitting(true);
    method()
      .then(async (result) => {
        const u = result.user;
        const userData = {
            email: u.email,
            name: u.displayName,
            image: u.photoURL
        };
        await instance.put("/users", userData);

        toast.success("Social Login Successful! ✨");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Social authentication failed.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const fillDemoCredentials = () => {
    setEmailValue("admin@smartbill.com");
    setPasswordValue("Admin123");
    toast.success("Demo Credentials Filled! 🔑");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)] items-center gap-12 py-12">
      <title>Login | Smart Bills</title>
      <Toaster position="top-right" />

      {/* Animation Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-primary/5 rounded-[3rem] border border-primary/10">
        <div className="w-full max-w-lg">
          <Lottie animationData={loginAnim} loop={true} />
          <div className="mt-8 text-center text-primary">
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Unified Utility Access</h3>
            <p className="text-base-content/60 font-medium">Connect with 100+ national grid providers instantly.</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-base-100 p-10 rounded-[2.5rem] shadow-2xl border border-base-content/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-secondary"></div>
          
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-base-content mb-3">Welcome Back</h2>
            <p className="text-base-content/50 font-medium tracking-tight">Enter your credentials to manage your bills</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="label px-1">
                <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="fardin@smartbill.com"
                className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label px-1">
                <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">Secure Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="••••••••"
                  className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all w-full pr-12 font-medium text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
                <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary btn-lg flex-grow rounded-2xl shadow-xl shadow-primary/25 group overflow-hidden relative"
                >
                {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <>
                    <span className="relative z-10">Sign In</span>
                    <FaArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform relative z-10" />
                    </>
                )}
                </button>
                <button 
                  type="button"
                  onClick={fillDemoCredentials}
                  className="btn btn-lg btn-square bg-base-200 border-none rounded-2xl text-primary hover:bg-primary/10 transition-all tooltip tooltip-top"
                  data-tip="Auto-fill Demo Admin"
                >
                  <FaUserShield size={24} />
                </button>
            </div>
          </form>

          <div className="mt-8 text-center space-y-6">
            <p className="text-sm font-medium text-base-content/50">
              New to SmartBills?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create Account
              </Link>
            </p>

            <div className="divider text-xs font-bold text-base-content/20 uppercase tracking-widest leading-none">Social Gateway</div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin(googleLogin)}
                disabled={isSubmitting}
                className="btn btn-outline btn-lg rounded-2xl flex flex-col items-center justify-center p-0 h-auto py-4 border-base-content/10 hover:bg-base-200 transition-colors tooltip tooltip-bottom"
                data-tip="Google"
              >
                <FcGoogle size={24} />
              </button>
              <button
                onClick={() => handleSocialLogin(githubLogin)}
                disabled={isSubmitting}
                className="btn btn-outline btn-lg rounded-2xl flex flex-col items-center justify-center p-0 h-auto py-4 border-base-content/10 hover:bg-base-200 transition-colors tooltip tooltip-bottom"
                data-tip="GitHub"
              >
                <FaGithub size={24} />
              </button>
              <button
                onClick={() => handleSocialLogin(facebookLogin)}
                disabled={isSubmitting}
                className="btn btn-outline btn-lg rounded-2xl flex flex-col items-center justify-center p-0 h-auto py-4 border-base-content/10 hover:bg-base-200 transition-colors tooltip tooltip-bottom text-blue-600"
                data-tip="Facebook"
              >
                <FaFacebook size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
