import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { HiKey, HiMail } from "react-icons/hi"; // Import HiKey for the token field
import { Link } from "react-router-dom";
import AuthCard from "../components/Login-Signup/AuthCard";
import PasswordFieldWithLabel from "../components/Login-Signup/PasswordFieldWithLabel";
import RingAndCardsDesign from "../components/Login-Signup/RingAndCardsDesign";
import TextFieldWithLabel from "../components/Login-Signup/TextFieldWithLabel";
import PrimaryButton from "../components/common/PrimaryButton";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [password, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleSendToken = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/users/password-recovery/request-password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Token sent successfully!");
        setError(null);
        setToken("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to send token");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Token sending error:", error);
      setError("An unexpected error occurred");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckToken = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3001/users/password-recovery/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, token }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Password recovery successful!");
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to recover password");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Password recovery error:", error);
      setError("An unexpected error occurred");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-container bg-[url('./assets/images/light-bg.jpg')] dark:bg-[url('./assets/images/dark-bg.jpg')] bg-contain bg-no-repeat min-h-[100vh] flex bg-light-bg dark:bg-dark-bg">
      <div className="w-full flex flex-col items-center sm:flex-row-reverse">
        <RingAndCardsDesign />

        <AuthCard>
          <Link to="/">
            <button className="border dark:border-white p-1 rounded-[3px] sm:hidden">
              <FaAngleLeft className="text-xl text-black dark:text-white" />
            </button>
          </Link>

          <div className="w-full h-full mb-2 flex flex-col gap-8 sm:justify-center">
            <div>
              <h1 className="dark:text-white">Forgot Password</h1>

              <p className="text-dark-slate">
                Enter your email below, you will receive an email with
                instructions on how to reset your password in a few minutes.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {error && <p className="text-pale-red">{error}</p>}
              {successMessage && (
                <p className="text-pale-green">{successMessage}</p>
              )}

              <TextFieldWithLabel
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={HiMail}
                value={email}
                onChange={handleEmailChange}
              />

              {token === null ? (
                <PrimaryButton
                  btnLabel="Send Token"
                  onClick={handleSendToken}
                  isLoading={loading}
                />
              ) : (
                <>
                  <TextFieldWithLabel
                    label="Token"
                    type="text"
                    placeholder="Enter the token from your email"
                    icon={HiKey}
                    value={token}
                    onChange={handleTokenChange}
                  />

                  <PasswordFieldWithLabel
                    label="New Password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={handleNewPasswordChange}
                  />

                  <PrimaryButton
                    btnLabel="Recover Password"
                    onClick={handleCheckToken}
                    isLoading={loading}
                  />
                </>
              )}
            </div>

            <div className="hidden sm:flex flex-col items-center gap-1 lg:flex-row lg:gap-2 lg:mt-[10%]">
              <p className="dark:text-white">Already registered?</p>
              <Link to="/signin" className="font-bold dark:text-white">
                Sign in to your account
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
