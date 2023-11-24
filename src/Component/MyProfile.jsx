import React, { useEffect, useState } from 'react'
import {collection,getDocs,query,where} from 'firebase/firestore'
import { auth, db } from '../Firebase/FirebaseConfig'
const MyProfile = () => {
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
  // console.log(loggedUser[0].email)
  return (
    <>
{loggedUser[0]?.email ? (
      <span>{loggedUser[0].email}</span>
    ) : (
      <span>Loading...</span>
    )}
    </>
  )
}

export default MyProfile