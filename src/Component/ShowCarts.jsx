import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase/FirebaseConfig';
import ShowCardCart from './ShowCardCart';

const ShowCarts = () => {
    const [cardData,setCardData] = useState([]);
    const GetCurrentUser = () =>{
      const [user,setUser] = useState('')
      const userCollection = collection(db,"users")
      useEffect(()=>{
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
    

  return (
   <>
   {cardData.map((item) =>{
    return(
      <ShowCardCart key={item.id} itemdata={item}/>
    )
    })}

   </>
  )
}

export default ShowCarts