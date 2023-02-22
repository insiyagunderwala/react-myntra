import React, {useState} from "react";
import { Link } from "react-router-dom";
import './login.css';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [succMsg, setSuccMsg] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setSuccMsg("Login Successful");
      setEmail('');
      setPassword('');
      setErrMsg('');
      setTimeout(() => {
          setSuccMsg('');
          navigate('/');
      });
    }).catch((error) => {
      setErrMsg(error.message);
    })
}

  return (
    <div className=" container">
      <h1 style={{fontWeight: "400", textAlign: "center"}}>Welcome to Myntra!</h1>
      <br></br>
      <h1 style={{textAlign: "center", fontWeight:"400"}}>Login</h1>
      <br></br>
      {succMsg&& <>
        <div className="success-msg">{succMsg}</div>
        <br></br>
      </>}
      <form className="form-container" autoComplete="off" onSubmit={handleLogin}>
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
            <button style={{alignSelf: "center", marginRight:"220px"}} type="submit" className="btn btn-primary btn-md">Login</button>
        </div>
        <br></br>
        <p>Are you a new user? If yes, then <Link to="/signup" style={{paddingTop:"30px"}}>Sign Up</Link></p> 
        <br></br>
      </form>
      {errMsg&& <>
        <br></br>
        <div className="error-msg">{errMsg}</div>      
      </>}
    </div>
  );
}

export default Login;

