import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoadingButton(true);
    e.preventDefault();
    const displayName = e.target[0].value.toLocaleLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //creating a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setIsLoadingButton(false);
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setErrMessage(err.message);
            setIsLoadingButton(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setErrMessage(err.message);
      setIsLoadingButton(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Cha-Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display me" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>

          {!isLoadingButton && <button>Sign Up</button>}
          {isLoadingButton && (
            <button disabled style={{ backgroundColor: "#868fae" }}>
              <Loader />
            </button>
          )}

          {err && (
            <span className="errorMessage">{`Something went wrong ${errMessage}`}</span>
          )}
        </form>

        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
