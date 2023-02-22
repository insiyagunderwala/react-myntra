import React, {useState} from "react";
import { Link } from "react-router-dom";
import './signup.css';
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');
    const handleSignup = (e) => {
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credential) => {
          console.log(credential);
          db.collection('Users').doc(credential.user.uid).set({
            FullName: fullName,
            Email: email,
            Password: password
          }).then(() => {
            setSuccMsg("Sign-up successful");
            setFullName('');
            setEmail('');
            setPassword('');
            setErrMsg('');
            setTimeout(() => {
              setSuccMsg('');
              navigate('/login');
          });
          }).catch((error) => {
            setErrMsg(error.message);
          })
        }).catch((error) => {
          setErrMsg(error.message);
        });
    }

  return (
    <div className="container-fluid">
      <h1 style={{fontWeight: "400", textAlign: "center"}}>Sign Up to Start Shopping!</h1>
      <br></br>
      {/* <h1 style={{fontWeight: "400", textAlign: "center"}}>Sign Up</h1> */}
      {/* <hr></hr>
      <br></br> */}
      {succMsg&& <>
        <div className="success-msg">{succMsg}</div>
        <br></br>
      </>}
      <form className="form-container" autoComplete="off" onSubmit={handleSignup}>
        <label>Full Name</label>
        <input type="text" className="form-control" required
        onChange={(e) => setFullName(e.target.value)} value = {fullName}></input>
        <br></br>
        <label>Email</label>
        <input type="email" className="form-control" required
        onChange={(e) => setEmail(e.target.value)} value = {email}></input>
        <br></br>
        <label>Password</label>
        <input type="password" className="form-control" required
        onChange={(e) => setPassword(e.target.value)} value = {password}></input>
        <br></br>
        <div className="btn-box">
            <br></br>
            <button type="submit" className="btn btn-primary btn-md" style={{marginRight:"220px"}}>Register</button>
        </div>
        <br></br>
        <span>Already have an account?  </span>    
        <Link to="/login">Login Here</Link>
        <br></br>
      </form>
      {errMsg&& <>
        <br></br>
        <div className="error-msg">{errMsg}</div>      
      </>}
    </div>
  );
}

export default Signup;