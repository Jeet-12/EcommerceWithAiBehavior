import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import {collection,getDocs,query,where} from 'firebase/firestore'
import { auth, db } from '../Firebase/FirebaseConfig'
import HomeProductShow from '../Products Section/HomeProductShow'


const HomePage = () => {
  const GetCurrentUser = () =>{
    const [user,setUser] = useState('')
    const userCollection = collection(db,"users")
    useEffect (()=>{
      auth.onAuthStateChanged(userlogged =>{
        if(userlogged){
          const getUsers = async () =>{
            const q = query(collection(db,"users"),where("uid","==",userlogged.uid))
           const data = await getDocs(q);
           setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
          }
          getUsers()
        }
        else{
          setUser(null)
        }
      })
    },[])
    return user
  }
  let loggedUser = GetCurrentUser()
  // let loggedUserValue = loggedUser[0] ? JSON.parse(loggedUser[0]) : null;
  return (
    <>
    
      
        <Navbar/>
        <Banner/>
        <div className="container">
        <HomeProductShow type={"Mobile"}/>
    </div>
    </>
  )
}

export default HomePage