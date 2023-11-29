import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../Firebase/FirebaseConfig'
import HomeProductShow from '../Products Section/HomeProductShow'
import { Link } from 'react-router-dom'


const HomePage = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState('')
    const userCollection = collection(db, "users")
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers()
        }
        else {
          setUser(null)
        }
      })
    }, [])
    return user
  }
  let loggedUser = GetCurrentUser()
  // let loggedUserValue = loggedUser[0] ? JSON.parse(loggedUser[0]) : null;
  return (
    <>


      <Navbar />
      <Banner />
      <div className="addver-cont">
        <div className="container" >
          <HomeProductShow type={"Mobile"} />
        </div>
        <div className="addver">
        <Link to="https://www.jiomart.com/" target='_blank' style={{height:"24vh"}}>  <img src="https://newspaperads.ads2publish.com/wp-content/uploads/2021/03/jiomart-com-presents-holi-ready-sale-ad-bombay-times-24-03-2021.jpg" alt="" style={{width:"100%",height:"100%"}} /></Link>
          

        </div>
      </div>
    </>
  )
}

export default HomePage