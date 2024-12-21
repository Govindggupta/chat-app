import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator, fullNameValidator, emailValidator } from "../utils/validators.ts";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../context/UseContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const { darkMode, toggleTheme } = useTheme();

  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const fullName = useInputValidation("", fullNameValidator);
  const email = useInputValidation("", emailValidator);

  const avatar = useFileHandler("single", 10);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await axios.post('/api/auth/login', credentials, { withCredentials: true });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      // console.error('Login error:', error);
      throw new Error(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: { fullName: string; username: string; email: string; password: string }) => {
      const res = await axios.post('/api/auth/register', userData, { withCredentials: true });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      // console.error('Registration error:', error);
      throw new Error(error.message);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ username: username.value, password: password.value });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate({
      fullName: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

      <Helmet>
        <title>{isLogin ? "Login" : "Register"} - Convo</title>
        <meta name="description" content={isLogin ? "Login to Convo" : "Create a new account on Convo"} />
      </Helmet>

      {/* Theme Toggle Button - Absolute Positioned */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-900 dark:text-white"
      >
        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome to Convo
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Sign in to your account" : "Create your new account"}
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
          {isLogin ? ( // sign in form
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Login
              </h2>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    value={username.value}
                    onChange={username.changeHandler}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {username.error && username.value && (
                    <p className="mt-1 text-sm text-red-500">{username.error}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    value={password.value}
                    onChange={password.changeHandler}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {password.error && password.value && (
                    <p className="mt-1 text-sm text-red-500">{password.error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Sign in
                </button>
              </form>
            </div>
          ) : ( // sign up form
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={avatar.preview || "/avatar-placeholder.png"}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <FaCamera size={16} />
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={avatar.changeHandler}
                    />
                  </label>
                </div>
              </div>
              {avatar.error && (
                <p className="mt-1 text-sm text-red-500 text-center">{avatar.error}</p>
              )}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Register
              </h2>
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    value={fullName.value}
                    onChange={fullName.changeHandler}
                    placeholder="Enter your full name"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {fullName.error && fullName.value && (
                    <p className="mt-1 text-sm text-red-600">{fullName.error}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="reg-username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    value={username.value}
                    onChange={username.changeHandler}
                    id="reg-username"
                    type="text"
                    placeholder="Choose a username"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {username.error && username.value && (
                    <p className="mt-1 text-sm text-red-500">{username.error}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email.value}
                    onChange={email.changeHandler}
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {email.error && email.value && (
                    <p className="mt-1 text-sm text-red-600">{email.error}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="reg-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    value={password.value}
                    onChange={password.changeHandler}
                    id="reg-password"
                    type="password"
                    placeholder="Choose a password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {password.error && password.value && (
                    <p className="mt-1 text-sm text-red-500">{password.error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 w-full text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;