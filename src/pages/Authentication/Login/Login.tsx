import { useState } from "react";
// import { useUserLoginMutation } from "../../redux/api/api";
// import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [userLogin, { isLoading }] = useUserLoginMutation();

  //   const handleLogin = async (userType: 'admin' | 'client') => {
  //     try {
  //       const response = await userLogin({ email, password, userType }).unwrap();
  //       if (!response) return;

  //       if (response.success && !isLoading) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Success",
  //           text: "Login successful!",
  //         }).then(() => {
  //           window.location.href = "/";
  //         });
  //       }

  //       localStorage.setItem("token", response.token);
  //     } catch (error: any) {
  //       console.error("Login failed:", error);
  //       alert(error.data?.message || "Login failed. Please try again.");
  //     }
  //   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        {/* Login Form Section */}
        <div className="flex flex-col w-1/2 bg-white p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-600 mt-2">
              Access your Legal Solutions account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              //   onClick={() => handleLogin('admin')}
              //   disabled={isLoading}
              className="w-full py-3 px-4  text-white font-medium rounded-md transition duration-300 flex items-center justify-center"
            >
              {/* {isLoading ? "Processing..." : "Admin Login"} */}
            </button>

            <button
              //   onClick={() => handleLogin('client')}
              //   disabled={isLoading}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition duration-300 flex items-center justify-center"
            >
              {/* {isLoading ? "Processing..." : "Client Login"} */}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition">
              Login as an Admin
            </a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-blue-600 transition">
              Log in to Webmail
            </a>
            <div className="mt-2">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Sign up here
              </a>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="flex flex-col items-center justify-center w-1/2   p-8">
          <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full">
            {/* Scale icon - using SVG */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg> */}
            <h1>Logo</h1>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-center">
            Welcome to Sazu Khadem Backend Services
          </h2>
          <p className="text-center  max-w-md">
            Your trusted partner for comprehensive legal solutions and
            professional services
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
