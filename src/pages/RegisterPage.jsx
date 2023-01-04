import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, {useState} from 'react';
import Add from '../images/avatar.png';
import { auth,db } from '../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL,getStorage } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName =  e.target[0].value;
    const email =  e.target[1].value;
    const password =  e.target[2].value;
    const file =  e.target[3].files[0];
    const storage = getStorage();
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
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
            navigate("/"); 
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);

          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);

    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper '>
        <span className='logo'>Chat App</span>
        <span className='title'>Register Here!</span>

        <form onSubmit={handleSubmit}>
          <input type={"text"} placeholder = "Display Name"/>
          <input type={"text"} placeholder = "Email"/>
          <input type={"text"} placeholder = "Password"/>
          <input style={{display:"none"}} type={"file"} id="file"/>
          <label htmlFor="file"> 
            <img src={Add} alt=''/>
            <span>Add an avatar here!</span>
          </label>
          <button disabled={loading}>Sign Up</button>
          {loading && "Uploading and compressing the image please wait..."}
        </form>
        <p>Already have an Account? Login Here</p>
        {err && <span>Something went Wrong</span>}
      </div> 
    </div>
  )
}
export default RegisterPage;
