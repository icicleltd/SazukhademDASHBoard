import { useState } from "react";
import { useLoginMutation } from "../../../redux/services/authApi/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();

      console.log(response);

      if (response?.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have been logged in successfully!",
        });

        // Redirect to dashboard or home page
      }
    } catch (error: any) {
      console.error("Login failed:", error);

      let errorMessage = "Login failed. Please try again.";
      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.status === "FETCH_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="mt-2">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Sign up here
              </a>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="flex flex-col items-center justify-center w-1/2 bg-blue-50 p-8">
          <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100">
            <h1 className="text-2xl font-bold text-blue-600">Logo</h1>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Welcome to Sazu Khadem Backend Services
          </h2>
          <p className="text-center text-gray-600 max-w-md">
            Your trusted partner for comprehensive legal solutions and
            professional services
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
