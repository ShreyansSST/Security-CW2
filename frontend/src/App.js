import React, { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HelpPage from "./pages/HelpPage";

function App() {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SigninPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/please-login" element={<ErrorPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
