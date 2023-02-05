import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Add from "../img/addAvatar.png";
import Loader from "../components/Loader";

const Login = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoadingButton(true);

    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
      setErrMessage(err.message);
    }
    setIsLoadingButton(false);

  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Cha-Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          
          {!isLoadingButton && <button>Sign In</button>}
        {isLoadingButton && <button disabled style={{backgroundColor:"#868fae"}}><Loader /></button>}
          {err && <span className="errorMessage">{`Something went wrong ${errMessage}`}</span>}

        </form>

        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
