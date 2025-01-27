import Header from "../components/header";

// InputField Component
const InputField = ({
    label,
    type = "text",
    id,
    className,
  }: {
    label: string;
    type: string;
    id: string;
    className?: string;
  }) => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={id} className="text-base font-medium mb-2 text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={id}
          className="{w-full bg-gray-100 rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:shadow-md transition-all ${className}}
          aria-label={label}"
        />
      </div>
    );
  };
  
  // Main Account Component
  const Account = () => {
    return (
        <><Header /><div
            id="account"
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center py-10 px-4"
        >
            <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Logo and Name Section */}
                <div className="flex flex-col items-center py-8 bg-gray-50 border-b border-gray-300">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-16 w-auto object-contain mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Furniro</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Login Section */}
                    <div className="p-8 bg-white md:border-r border-gray-300">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Log In</h1>
                        <form className="space-y-6">
                            <InputField
                                label="Username or Email Address"
                                id="login-email"
                                type="email" />
                            <InputField label="Password" id="login-password" type="password" />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="remember-me" className="text-sm text-gray-600">
                                    Remember Me
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                            >
                                Log In
                            </button>
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Your Password?
                            </button>
                        </form>
                    </div>

                    {/* Register Section */}
                    <div className="p-8 bg-gray-50">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
                        <form className="space-y-6">
                            <InputField label="Email Address" id="register-email" type="email" />
                            <p className="text-sm text-gray-600">
                                A link to set a new password will be sent to your email address.
                            </p>
                            <p className="text-sm text-gray-600">
                                Your personal data will be used to support your experience
                                throughout this website, to manage access to your account, and
                                for other purposes described in our{" "}
                                <span className="font-semibold text-blue-600 cursor-pointer">
                                    Privacy Policy
                                </span>
                                .
                            </p>
                            <button
                                type="submit"
                                className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div></>
    );
  };
  
  export default Account;