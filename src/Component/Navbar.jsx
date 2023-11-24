import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {collection,getDocs,query,where} from 'firebase/firestore'
import { auth, db } from '../Firebase/FirebaseConfig'

const Navbar = () => {
  const [cardData,setCardData] = useState([]);
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

  if(loggedUser){
    const getCardData = async() =>{
      const cartArray = [];
      const path = `cart-${loggedUser[0].uid}`;

      getDocs(collection(db,path)).then((querSnapShot)=>{
        querSnapShot.forEach((doc)=>{
          cartArray.push({...doc.data,id:doc.id});
        })
        setCardData(cartArray)
      }).catch((err)=>{console.log(err);})
    }
    getCardData()
  }

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  const handleLogOut = () =>{
    auth.signOut().then(()=>{
      navigate("/login")
    })
  }

  


     return (
      <>
   <div className='eco-navbar'>
   <div className='left-navlink'>
    <img src='https://hindubabynames.info/wp-content/themes/hbn_download/download/e-commerce-companies/jiomart-logo.png' alt='company logo' width={50} height={50}/>
    <div className="searchbar-navcon">
    <input type="search" className='nav-search'/>
    <i className="fa-solid fa-magnifying-glass searchicon-nav"></i>
    </div>
   </div>
    <div className='right-navlink'>
      <ul className='ul-link' onClick={()=>{navigate("/register")}}>
      <button className='sign-btn'>
    Sign up
    <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
</button>
      </ul>
      <ul className='ul-link' onClick={()=>{navigate("/login")}}>
      <button className='sign-btn'>
    Sign in
    <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
</button>

      </ul>
      <Link to='/carts'>
      <ul className='ul-link align-itemC' >
      <i className="fa-solid fa-cart-shopping i-cart" ></i>
      <p style={{color:"white"}}>{cardData.length}</p>
      </ul>
      </Link>
      <ul className='ul-link align-itemC ' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
      <i className="fa-solid fa-user i-user" ></i>
      
      </ul>
      {isHovered && (
      <div className='profile-detailopen' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className='float-content' onClick={()=>{navigate("/profile")}}>My Profile</div>
        <div className='float-content' onClick={handleLogOut}>LogOut</div>
      </div>
      )}
      </div>
     
   </div>
   <div className="product-section">
  <Link className="product-link" to="/allProduct/mobile">mobile</Link>
  <Link className="product-link" to="/allProduct/laptop">laptop</Link>
  <Link className="product-link" to="/allProduct/tv">tv</Link>
  <Link className="product-link" to="/allProduct/shoes">shoes</Link>
</div>

      </>
   
  )
}

export default Navbar