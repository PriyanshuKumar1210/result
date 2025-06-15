import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login.jsx';
import AnswerBookManagement from './Components/AnswerBookManagement.jsx';
import { Api } from './API/Api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Header from "./Components/Header.jsx"
import Footer from './Components/Footer.jsx'

const App = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Api); // Access context

 
  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <>
      <Router>
        <div className="app-container">
          {/* <Header /> */}
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/answer-book-management"
              element={
                isLoggedIn ? (
                  <AnswerBookManagement />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      {/* <AnswerBookManagement /> */}
      <ToastContainer />
    </>
  );
};

export default App;