import axios from "axios";
import React, { useContext, useState } from "react";
import { FaAngleLeft, FaUser } from "react-icons/fa";
import { HiMail, HiUser, HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";
import AuthCard from "../components/Login-Signup/AuthCard";
import PasswordFieldWithLabel from "../components/Login-Signup/PasswordFieldWithLabel";
import RingAndCardsDesign from "../components/Login-Signup/RingAndCardsDesign";
import TextFieldWithLabel from "../components/Login-Signup/TextFieldWithLabel";
import PrimaryButton from "../components/common/PrimaryButton";
import { UserContext } from "../context/UserContext";

const SignupPage = () => {
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Assess password strength
    const passwordScore = zxcvbn(password);
    setPasswordStrength(passwordScore.score);

    axios
      .post("https://localhost:3001/users/register", {
        fullname,
        username,
        email,
        password,
      })
      .then((response) => {
        setFullname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setMessage(response.data.message);
        setIsLoading(false);
        window.location.href = "/signin";
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
        setIsLoading(false);
      });
  };


  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "dark-green";
      default:
        return "";
    }
  };

  const handlePasswordChange = (e) => {
    // Update password state
    setPassword(e.target.value);

    // Assess password strength on each input change
    const passwordScore = zxcvbn(e.target.value);
    setPasswordStrength(passwordScore.score);
  };

  return (
    // <div className="bg-container bg-[url('./assets/images/light-bg.jpg')] dark:bg-[url('./assets/images/dark-bg.jpg')] bg-contain bg-no-repeat min-h-[100vh] flex bg-light-bg dark:bg-dark-bg">
    //   <div className="w-full flex flex-col items-center sm:flex-row-reverse">
    //     <RingAndCardsDesign />

    //     <AuthCard>
    //       <Link to="/">
    //         <button className="border dark:border-white p-1 rounded-[3px] sm:hidden">
    //           <FaAngleLeft className="text-xl text-black dark:text-white" />
    //         </button>
    //       </Link>
    //       <div className="w-full flex flex-col gap-8">
    //         <div>
    //           <h1 className="dark:text-white">Sign up</h1>

    //           <p className="text-dark-slate">
    //             Enter your personal information to create a new account
    //           </p>
    //         </div>

    //         <form className="flex flex-col gap-4">
    //           {error && <span className="text-pale-red">{error}</span>}

    //           {message && <span className="text-pale-green">{message}</span>}

    //           <TextFieldWithLabel
    //             label="Full Name"
    //             type="text"
    //             placeholder="Enter your full name"
    //             icon={HiUserCircle}
    //             value={fullname}
    //             onChange={(e) => setFullname(e.target.value)}
    //           />

    //           <TextFieldWithLabel
    //             label="Username"
    //             type="text"
    //             placeholder="Enter your username"
    //             icon={HiUser}
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />

    //           <TextFieldWithLabel
    //             label="Email"
    //             type="email"
    //             placeholder="Enter your email"
    //             icon={HiMail}
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />

    //           <PasswordFieldWithLabel
    //             label="Password"
    //             placeholder="Enter your password"
    //             value={password}
    //             onChange={handlePasswordChange}
    //           />

    //           {password && (
    //             <div className="text-sm text-gray-500">
    //               Password Strength:{" "}
    //               <span
    //                 className={`text-${getPasswordStrengthColor(
    //                   passwordStrength
    //                 )}`}
    //               >
    //                 {getPasswordStrengthLabel(passwordStrength)}
    //               </span>
    //             </div>
    //           )}

    //           <div className="flex flex-col gap-2 mb-2">
    //             <div className="flex gap-2">
    //               <input
    //                 type="checkbox"
    //                 name="terms-of-service"
    //                 id="terms-of-service"
    //                 className="custom-checkbox relative top-1 dark:border-white"
    //               />
    //               <label
    //                 htmlFor="terms-of-service"
    //                 className=" dark:text-white"
    //               >
    //                 I have read and agree to the Terms of Service
    //               </label>
    //             </div>
    //           </div>

    //           <PrimaryButton
    //             btnLabel="Create Account"
    //             isLoading={isLoading}
    //             onClick={handleSignup}
    //           />

    //           <div className="flex items-center gap-4 px-[10%] py-2">
    //             <hr className="flex-1 border dark:border-white" />
    //             <p className="font-semibold dark:text-white">or</p>
    //             <hr className="flex-1 border dark:border-white" />
    //           </div>

    //           <Link to="/">
    //             <button className="w-full flex items-center justify-center gap-2 bg-none border border-black dark:border-white rounded-[3px] py-3 px-5 sm:px-8">
    //               <FaUser className="text-xl text-black dark:text-white" />
    //               <p className="font-semibold dark:text-white">
    //                 Continue as Guest
    //               </p>
    //             </button>
    //           </Link>
    //         </form>

    //         <div className="hidden sm:flex flex-col items-center gap-1 lg:flex-row lg:gap-2 2xl:mt-[10%]">
    //           <p className="dark:text-white">Already registered?</p>
    //           <Link to="/signin" className="font-bold dark:text-white">
    //             Sign in to your account
    //           </Link>
    //         </div>
    //       </div>
    //     </AuthCard>
    //   </div>
    // </div>
  );
};

export default SignupPage;
