import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";



const LoginPage = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
        <div className='formWrapper '>
            <span className='logo'>Chat App</span>
            <span className='title'>Sign In below</span>
            <form onSubmit={handleSubmit}>
            <input type="email" placeholder = "Email"/>
            <input type="password" placeholder = "Password"/>
            <button>Sign In </button>
            {err && <span>Something went wrong</span>}
            </form>
            <p>Don't have an Account? <Link to="/register">Register here!</Link></p>
        </div>
    </div>
  );
};

export default LoginPage;