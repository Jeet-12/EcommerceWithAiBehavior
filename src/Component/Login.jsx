import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const [errorMsg,setError] = useState('')
  const [successfullMsg,setSuccessfullMsg] = useState('')
  const auth = getAuth()

const handleLogin = (e) =>{
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password)
  .then(()=>{
    setSuccessfullMsg("Login Sucessfully");
    setEmail('');
   
    setPassword('');
 
    setTimeout(()=>{
        setSuccessfullMsg('');
        navigate("/");

    },1000)
})
}
  
  return (
      <>
     
      <div className='Login-container'>

      <div className="form-box">
<form className="form" onSubmit={handleLogin}>
  <span className="title">Sign in</span>
  {successfullMsg && (
      <div className='sucessful-register'>
          <p>{successfullMsg}</p></div>)
  }
  {errorMsg && (
      <div className='error-register'>
          <p>{errorMsg}</p></div>)
  }
  
  {/* <span className="subtitle">Create a free account with your email.</span> */}
  <div className="form-container">
    <input type="email" className="input" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/>
    <input type="password" className="input" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
  </div>
  <button type='submit' >Sign in</button>
</form>
<div className="form-section">
<p>Don't have an account? <Link to={"/register"}>Sign up</Link> </p>
</div>
</div>
</div>
</>
  )
}

export default Login