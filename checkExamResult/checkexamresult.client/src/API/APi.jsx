import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = 'https://exam.icsi.edu/consentform/utility';
const API_BASE_URL = 'https://localhost:7221/api';

export const API_URL = {
  examSession: `${API_BASE}/ExamSession`,
};

export const Api = createContext();

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [examSession, setExamSession] = useState('');
  const [examYear, setExamYear] = useState('');
  const [loginData, setLoginData] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loggedin")); 

  const fetchExamDetails = async () => {
    try {
      const res = await axios.get(API_URL.examSession);
      const { data } = res.data;

      if (data && data.length > 0) {
        const { SessionYearReplyPerforma } = data[0];
        const [session, year] = SessionYearReplyPerforma.split('-');
        setExamSession(session.trim());
        setExamYear(year.trim());
        // console.log("Exam Session:", session.trim());
        // console.log("Exam Year:", year.trim());
      }
    } catch (err) {
      console.error('Error fetching exam details:', err.message);
      setError(err.message);
    }
  };


 const fetchLoginData = async (loginId, password) => {
  const loginPayload = {
    UserID: loginId,
    Password: password,
  };

  try {
    setLoginLoading(true);
    setLoginError(null);
    const response = await axios.post(`${API_BASE_URL}/Home/Login`, loginPayload);

    const data = response.data;
    if (data?.status === "success") {
      setLoginData(data.data[0]); // Store the actual user object
      localStorage.setItem("loggedin", "true");
      localStorage.setItem("userCredentials", JSON.stringify(loginPayload));
      setIsLoggedIn(true);
    }

    console.log("Login Data:", data);
    return { success: true, data: data.data[0] };
  } catch (err) {
    console.error("Error fetching login data:", err.message);
    setLoginError(err.message);
    setIsLoggedIn(false);
    return { success: false, error: err.message };
  } finally {
    setLoginLoading(false);
  }
};


  useEffect(() => {
    fetchExamDetails();
  }, []);

  useEffect(()=>{
    fetchLoginData();
  },[])

  return (
    <Api.Provider
      value={{
        apiData,
        error,
        examSession,
        examYear,
        fetchLoginData,
        loginData,
        loginLoading,
        loginError,
        isLoggedIn,
        setIsLoggedIn, // Include setIsLoggedIn in context
      }}
    >
      {children}
    </Api.Provider>
  );
};