import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase/FirebaseConfig';
import Navbar from '../Component/Navbar';


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
    <Navbar/>

    {product?
    <>
<div className="product-dtlsec" style={{display:"flex",}}>
<div style={{display:"flex",flexDirection:"column",width:"25%", marginLeft:"2rem",marginTop:"2rem",justifyContent:"center"}}>
<img src={product.productImage} alt="" style={{height:"25rem",width:"100%"}}/>

    <div onClick={addCart} style={{display:"flex",justifyContent:"center",marginTop:"1rem", }}> <p style={{padding:"1rem",backgroundColor:"#ff9f00",color:"white",borderRadius:"10px",fontWeight:"bold"}}> <i className="fa-solid fa-cart-shopping"></i> &nbsp; ADD TO CART</p> </div>
    </div>
    <div style={{width:"70%",marginLeft:"1rem"}}>
    <p style={{fontSize:"23px",margin:"5px"}}>{product.title}</p>
    <div style={{display:"flex",margin:"5px"}}><p style={{backgroundColor:"green",width:"3rem",justifyContent:"center",display:"flex",color:"white",alignContent:"center"}}>4.5 <i className="fa-solid fa-star" style={{color:"white",fontSize:"13px"}}></i></p>&nbsp; <p style={{color:"grey"}}>12,03,040 Rating & 12,90,900 Reviews</p></div>
    <p style={{fontSize:"30px",fontWeight:"600",margin:"5px",marginTop:"1rem"}}>{product.price}</p>
    <div style={{display:"flex",margin:"5px",marginTop:"2rem"}}>
      <p style={{width:"10%"}}>Description</p>
      <p style={{width:"90%"}}>{product.description}</p>
      
    </div>
    <div style={{margin:"5px",marginTop:"2rem"}}>
      <p style={{width:"10%"}}>Specification</p>
      <p style={{width:"90%"}}>{product.specification}</p>
      
    </div>
     </div>
    </div>
    </>
    :
    <div>Loading...</div>
    }
    </>
  )
}

export default ProductsDetails