import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import useAuthStore from "./zustand/useAuthStore";
import ValidationMessage from "@components/ui/ValidationMessage";

export default function RegisterForm() {
  const [isClient, setIsClient] = useState(false);

  try {
    if (!isClient) setIsClient(true);
  } catch (error) {}

  const [showPassword, setShowPassword] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { register, user, isAuthenticated, error } = useAuthStore();

  console.log("errorrr: ", error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isClient) {
      setError("Please wait until the page is fully loaded");
      return;
    }

    const reqData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };

    console.log(reqData);

    try {
      const data = await register(reqData);
      console.log("la data: ", data);
      console.log("la user: ", user);
      // Redirect to previous page or dashboard
      // window.location.href = "/account";
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow container mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Left side - Decorative/Informative */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl overflow-hidden shadow-xl relative"></div>

        {/* Right side - Auth forms */}
        <div className="md:w-1/2 flex flex-col items-center">
          {/* Tab switcher */}
          <div className="mb-8 flex bg-gray-100 p-1 rounded-xl gap-1 w-full max-w-md">
            <a
              href="/account/login"
              className={`flex-1 py-3 px-6 rounded-lg font-medium flex justify-center items-center gap-2 text-gray-600 hover:text-gray-800`}
            >
              <LogIn size={18} />
              <span>Login</span>
            </a>
            <a
              href="/account/register"
              className={`flex-1 py-3 px-6 rounded-lg font-medium flex justify-center items-center gap-2 bg-white shadow-sm text-blue-700`}
            >
              <UserPlus size={18} />
              <span>Register</span>
            </a>
          </div>

          {/* Register Form */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Create your account
              </h2>
              <ValidationMessage error={error} defaultMessage="Register gagal! Silahkan coba kembali" />

              <div className="space-y-5 mt-3">
                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-medium"
                    htmlFor="register-name"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="register-name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-medium"
                    htmlFor="register-email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="register-email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-medium"
                    htmlFor="register-password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Must be at least 6 characters
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <span className="text-blue-600">Terms of Service</span> and{" "}
                    <span className="text-blue-600">Privacy Policy</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6 shadow-md transition-colors flex items-center justify-center"
              >
                <span>Create Account</span>
                <ArrowRight size={18} className="ml-2" />
              </button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>
              </div>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <a
                href="/account/login"
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
