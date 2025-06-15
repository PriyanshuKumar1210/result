import { useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Api } from "../API/Api"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [captchaCode, setCaptchaCode] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [focusedState, setFocusedState] = useState({
    session: false,
    loginId: false,
    password: false,
    captcha: false,
    year: false,
  });
  const { setIsLoggedIn, fetchLoginData, loginLoading, loginError, examSession, examYear } = useContext(Api);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
    return () => sessionStorage.removeItem("captchaCode");
  }, []);

  const handleFocus = (field) => {
    setFocusedState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field, value) => {
    setFocusedState((prev) => ({ ...prev, [field]: !!value }));
  };

  const handleLoginIdChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setLoginId(value);
    }
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleCaptchaInput = (e) => setCaptcha(e.target.value);

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f5f5f5";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const characters = "ABCDEFGHKMNPRSTUVWXYZabcdefghijklmniopqrstuvwxyz0123456789";
    let captchaStr = "";
    const angleMin = -45;
    const angleMax = 45;
    const fontMin = 20;
    const fontMax = 30;

    for (let i = 0; i < 4; i++) {
      const char = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      captchaStr += char;
      context.font = `${fontMin + Math.random() * (fontMax - fontMin)}px Arial`;
      context.fillStyle = "#333";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const angle = angleMin + Math.random() * (angleMax - angleMin);
      context.save();
      context.translate(20 + i * 30, canvas.height / 2);
      context.rotate((angle * Math.PI) / 180);
      context.fillText(char, 0, 0);
      context.restore();
    }

    setCaptchaCode(captchaStr);
    sessionStorage.setItem("captchaCode", captchaStr);
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
    setCaptcha("");
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const storedCaptcha = sessionStorage.getItem("captchaCode");
    if (captcha.toLowerCase() !== storedCaptcha?.toLowerCase()) {
      toast.error("Invalid CAPTCHA. Please try again.");
      handleRefreshCaptcha();
      setCaptcha("");
      return;
    }
  
    if (!password) {
      toast.error("Please enter a password.");
      return;
    }
  
    
    if (!examSession || !examYear) {
      toast.error("Session and year are required.");
      return;
    }
  
    try {
      const loginResponse = await fetchLoginData(loginId, password);
     
      console.log("LoginRes",loginResponse)
     if (loginResponse.success && loginResponse.data ) {
        const user = loginResponse.data;

        // const user = loginResponse.data.data[0];
        console.log("user",user)
        if (user.UserID === loginId && user.Password === password) {
          setIsLoggedIn(true);
          localStorage.setItem("loggedin", true);
          onLogin();
          toast.success("Successfully Logged In");
          console.log("Successfully logged in:", user);
          navigate("/answer-book-management")
        } else {
          toast.error("Invalid Unique ID or Password.");
          console.log("Login failed: Credentials do not match.");
        }
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error("Login error:", error.message, error.stack);
    }
  
    handleRefreshCaptcha();
    setCaptcha("");
  };
  const examSessionDisplay = `${examSession || ""} ${examYear || ""}`.trim();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-5">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md box-border">
        <h3 className="text-center text-gray-800 mb-5 text-2xl font-semibold">
          Log In
        </h3>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              id="session"
              value={examSessionDisplay}
              readOnly
              required
              disabled
              className={`w-full p-3 border rounded-md outline-none transition-colors ${
                focusedState.session ? "border-blue-500" : "border-gray-300"
              }`}
            />
            <label
              htmlFor="session"
              className={`absolute left-3 transition-all duration-300 ${
                focusedState.session || examSessionDisplay
                  ? "-top-2 text-xs text-gray-600 bg-white px-1"
                  : "top-3 text-base text-gray-400 bg-white px-1"
              }`}
            >
              Session<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Input UniqueId field */}
          <div className="relative">
            <input
              type="text"
              id="loginid"
              value={loginId}
              onFocus={() => handleFocus("loginId")}
              onBlur={() => handleBlur("loginId", loginId)}
              onChange={handleLoginIdChange}
              required
              className={`w-full p-3 border rounded-md outline-none transition-colors ${
                focusedState.loginId ? "border-blue-500" : "border-gray-300"
              }`}
            />
            <label
              htmlFor="loginid"
              className={`absolute left-3 transition-all duration-300 ${
                focusedState.loginId || loginId
                  ? "-top-2 text-xs text-gray-600 bg-white px-1"
                  : "top-3 text-base text-gray-400 bg-white px-1"
              }`}
            >
              Unique ID<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Input password field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password", password)}
              onChange={handlePasswordChange}
              required
              className={`w-full p-3 border rounded-md outline-none transition-colors ${
                focusedState.password ? "border-blue-500" : "border-gray-300"
              }`}
            />
            <label
              htmlFor="password"
              className={`absolute left-3 transition-all duration-300 ${
                focusedState.password || password
                  ? "-top-2 text-xs text-gray-600 bg-white px-1"
                  : "top-3 text-base text-gray-400 bg-white px-1"
              }`}
            >
              Password<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Captcha Field */}
          <div className="relative">
            <input
              type="text"
              id="captchaInput"
              value={captcha}
              onFocus={() => handleFocus("captcha")}
              onBlur={() => handleBlur("captcha", captcha)}
              onChange={handleCaptchaInput}
              required
              className={`w-full p-3 border rounded-md outline-none transition-colors ${
                focusedState.captcha ? "border-blue-500" : "border-gray-300"
              }`}
            />
            <label
              htmlFor="captchaInput"
              className={`absolute left-3 transition-all duration-300 ${
                focusedState.captcha || captcha
                  ? "-top-2 text-xs text-gray-600 bg-white px-1"
                  : "top-3 text-base text-gray-400 bg-white px-1"
              }`}
            >
              Captcha<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Refresh Button */}
          <div className="flex items-center gap-3 flex-wrap">
            <canvas
              ref={canvasRef}
              width="180"
              height="50"
              className="border border-gray-300 rounded-md bg-gray-100 w-full max-w-[180px]"
            />
            <button
              type="button"
              onClick={handleRefreshCaptcha}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              Refresh
            </button>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={
                !examSession || !examYear || !loginId || !password || !captcha || loginLoading
              }
              className={`w-full p-3 rounded-md text-white font-semibold text-base transition-colors ${
                !examSession || !examYear || !loginId || !password || !captcha || loginLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loginLoading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;