import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase/FirebaseConfig';

const ProductsDetails = () => {
    const {id,type} = useParams()
    const[product,setProducts] = useState('');
    function GetProductValues(){

        useEffect(()=>{
            const getProducts = async() =>{
                const docRef = doc(db,`products-${type.toUpperCase()}`,id);
                const docSnap = await getDoc(docRef);
                setProducts(docSnap.data());
            }
            getProducts()
        },[])
        return product
    }

    GetProductValues()

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
    const addCart = ()=>{
      if(loggedUser){
        addDoc(collection(db,`cart-${loggedUser[0].uid}`),{
          product,quantity : 1
        }).then(()=>{
          console.log("succesful");
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  return (
    <>
    {product?
    <>
    <p>{product.price}</p>
    <p onClick={addCart}>add to cart</p>
    </>
    :
    <div>Loading...</div>
    }
    </>
  )
}

export default ProductsDetails