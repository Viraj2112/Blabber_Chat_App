import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  User,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import AuthImage from "./AuthImage.jsx";
import toast from "react-hot-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { authUser, login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  function validateForm() {
    if (!formData.email.trim() || !formData.password.trim())
      return toast.error("All the fields are Required.");

    // Email Validation code using AI
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Please put a Valid Email");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationResult = validateForm();

    if (validationResult === true) login(formData);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
    authUser && navigate("/");
  }, [navigate, authUser]);

  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2 pt-10">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Message Logo */}
            <div className="mx-auto size-12 rounded-xl  flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-10 text-primary" />
            </div>

            <h2 className="mt-10 text-center text-5xl font-bold tracking-tight">
              Log In
            </h2>
            <p className="mt-5 text-center text-base-content/60">
              Log in to your account
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium"
                >
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-1 flex items-center z-10">
                    <Mail className=" text-base-content/40" />
                  </div>
                  <input
                    id="email"
                    value={formData.email.trim()}
                    onChange={(e) => handleChange(e)}
                    onClick={(e) => e.target.select()}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="user@example.com"
                    className="block w-full rounded-md  px-10 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-1 flex items-center">
                    <Lock className=" text-base-content/40" />
                  </div>
                  <input
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    onClick={(e) => e.target.select()}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="******"
                    className="block w-full rounded-md px-10 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="text-base-content/40" />
                    ) : (
                      <EyeOff className="text-base-content/40" />
                    )}
                  </button>
                </div>
                
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="flex w-full justify-center rounded-md btn btn-primary"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-base-content/60">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold link link-primary"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>

        {/* right side */}

        <AuthImage
          title="Join our Community"
          subtitle="Connect with friends, share moments, and stay in touch always..."
        />
      </div>
    </>
  );
}

export default LoginPage;
