import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight, FaEye, FaEyeSlash, FaFacebook, FaGithub, FaShieldAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import instance from "../hook/useAxios";
import registerAnim from "../lotties/login.json";
import { AuthContext } from "../provider/AuthProvider";
import { uploadImage } from "../utils/imageUpload";

const Register = () => {
  const { user, setLoading, createUser, updateUserProfile, googleLogin, githubLogin, facebookLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoFile = form.photo.files[0];
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Security standards not met! Ensure 1 Uppercase, 1 Lowercase, and 6+ characters.", {
          duration: 4000,
          style: { borderRadius: '1rem', background: '#ef4444', color: '#fff' }
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Upload Image to ImgBB
      let photoURL = "";
      if (photoFile) {
        const uploadRes = await uploadImage(photoFile);
        if (uploadRes.success) {
          photoURL = uploadRes.data.display_url;
        }
      }

      // 2. Create User in Firebase
      await createUser(email, password);
      
      // 3. Update Firebase Profile
      await updateUserProfile({ displayName: name, photoURL: photoURL });

      // 4. Save User to Database
      const userData = { email, name, image: photoURL };
      await instance.put("/users", userData);

      toast.success("Identity Verified! Welcome ✨", {
          style: { borderRadius: '1rem', background: '#10b981', color: '#fff' }
      });
      form.reset();
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.error(err);
      let message = "Registration failed.";
      if (err.code === 'auth/email-already-in-use') message = "Email identity already exists.";
      toast.error(message, { style: { borderRadius: '1rem' }});
    } finally {
      setIsSubmitting(false);
    }
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

        toast.success("Account Secured! Welcome ✨");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Social authentication failed.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-[calc(100vh-140px)] items-center gap-12 py-12">
      <title>Register | Smart Bills</title>
      <Toaster position="top-right" />

      {/* Animation Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-secondary/5 rounded-[3rem] border border-secondary/10">
        <div className="w-full max-w-lg text-center">
          <Lottie animationData={registerAnim} loop={true} />
          <div className="mt-8 space-y-2">
            <h3 className="text-2xl font-black text-secondary uppercase tracking-tighter italic">Secured Utility Infrastructure</h3>
            <p className="text-base-content/60 font-medium">Provision your account for automated domestic billing.</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-full max-w-md bg-base-100 p-10 rounded-[2.5rem] shadow-2xl border border-base-content/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-secondary to-primary"></div>
          
          <div className="mb-8 text-center text-secondary">
            <h2 className="text-4xl font-black mb-3 italic tracking-tighter">Get Started</h2>
            <p className="text-base-content/50 font-medium tracking-tight">Create your secure smart utility account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label px-1">
                <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">Full Name</span>
              </label>
              <input type="text" name="name" placeholder="John Doe" className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-base" required />
            </div>

            <div className="form-control">
              <label className="label px-1">
                <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">Email Identity</span>
              </label>
              <input type="email" name="email" placeholder="john@doe.com" className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-base" required />
            </div>

            <div className="form-control">
              <label className="label px-1">
                <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">Profile Identity Frame</span>
              </label>
              <input type="file" name="photo" className="file-input file-input-bordered file-input-secondary w-full bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-xs" required />
            </div>

            <div className="form-control relative">
              <label className="label px-1">
                <span className="label-text font-bold text-base-content/70 uppercase text-xs tracking-widest">Encryption Key</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all w-full pr-12 font-medium text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-secondary transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              <div className="flex items-center gap-2 px-1 mt-3 opacity-30">
                  <FaShieldAlt size={10} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">6+ Chars, Mix-case</p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-secondary btn-lg w-full rounded-2xl shadow-xl shadow-secondary/25 group overflow-hidden relative mt-2"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <span className="relative z-10 text-white">Provision Account</span>
                  <FaArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform relative z-10 text-white" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-6">
            <p className="text-sm font-medium text-base-content/50">
              Already authorized?{" "}
              <Link to="/login" className="text-secondary font-bold hover:underline">
                Sign In Instead
              </Link>
            </p>

            <div className="divider text-xs font-bold text-base-content/20 uppercase tracking-widest font-black italic leading-none">Social Link</div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin(googleLogin)}
                disabled={isSubmitting}
                className="btn btn-outline btn-lg rounded-2xl flex flex-col items-center justify-center h-auto py-4 border-base-content/10 hover:bg-base-200 transition-colors tooltip tooltip-bottom"
                data-tip="Google"
              >
                <FcGoogle size={24} />
              </button>
              <button
                onClick={() => handleSocialLogin(githubLogin)}
                disabled={isSubmitting}
                className="btn btn-outline btn-lg rounded-2xl flex flex-col items-center justify-center h-auto py-4 border-base-content/10 hover:bg-base-200 transition-colors tooltip tooltip-bottom"
                data-tip="GitHub"
              >
                <FaGithub size={24} />
              </button>
              <button
                onClick={() => handleSocialLogin(facebookLogin)}
                disabled={isSubmitting}
                className="btn btn-outline btn-lg rounded-2xl flex flex-col items-center justify-center h-auto py-4 border-base-content/10 hover:bg-base-200 transition-colors tooltip tooltip-bottom text-blue-600"
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

export default Register;
