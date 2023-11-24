import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth , db} from "../Firebase/FirebaseConfig"
import { collection,addDoc } from 'firebase/firestore'


const Register = () => {

    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMsg,setError] = useState('')
    const [successfullMsg,setSuccessfullMsg] = useState('')
    

    const handleSubmit =(e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            const initialcartvalue =0;
            console.log(user);
            addDoc(collection(db,"users"),{
                username:fullName,email:email,phonenumber:number,password:password,cart:initialcartvalue,uid:user.uid
            })
            .then(()=>{
                setSuccessfullMsg("Successfully Created New User and redirect to login page");
                setEmail('');
                setFullName('');
                setPassword('');
                setNumber('');
                setTimeout(()=>{
                    setSuccessfullMsg('');
                    navigate("/login");

                },100)
            })

            
        }).catch((error) => {
            if (error.code === 'auth/invalid-email') {
                setError('Please fill in all required fields.');
            } else if (error.code === 'auth/email-already-in-use') {
                setError('User already exists.');
            } else {
                console.error("Firebase Error:", error);
            }
        });
        
       }
    
    return (
        <>
       
        <div className='Register-container'>

        <div className="form-box">
<form className="form" onSubmit={handleSubmit}>
    <span className="title">Sign up</span>
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
      <input type="text" className="input" placeholder="Full Name" onChange={(e)=>{setFullName(e.target.value)}} required/>
			<input type="email" className="input" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/>
			<input type="number" className="input" placeholder="Mobile No." onChange={(e)=>{setNumber(e.target.value)}} required/>
			<input type="password" className="input" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
    </div>
    <button type='submit' >Sign up</button>
</form>
<div className="form-section">
  <p>Have an account? <Link to={"/login"}>Sign in</Link> </p>
</div>
</div>
</div>
</>
    )
}

export default Register


