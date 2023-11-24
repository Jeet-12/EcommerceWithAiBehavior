import React, { useEffect, useState } from 'react'
import {addDoc, collection,getDocs,query,where} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../Firebase/FirebaseConfig'
const AddProduct = () => {
    const [title,setTitle] = useState('')
    const [productType,setProductType] = useState('')
    const [brandType,setBrandType] = useState('')
    const [warranty,setWarranty] = useState('')
    const [description,setDescription] = useState('')
    const [imageError,setImageError] = useState('')
    const [price,setPrice] = useState('')
    const [specification,setSpecification] = useState('')
    const [productImage,setProductImage] = useState('')
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
 const types = ["image/png","image/jpg","image/jpeg","image/PNG"];

  const handleImageGether = (e) => {
    console.log(e.target.files[0]);
    let selectedImage = e.target.files[0];
    console.log(selectedImage);
    if (selectedImage) {
      if(selectedImage && types.includes(selectedImage.type)){

        setProductImage(selectedImage);
        setImageError("")
      }
      else{
        setImageError("Select a valid image type(png,jpg)"); 
      }
    }
    else{
      setImageError("Please select a file")
    }
  };
  
  console.log(title,
    productType,
    description,
    brandType,
    price,
    warranty,
    specification)
    const handleAddProduct = (e) =>{
     
        e.preventDefault();

        console.log(title,
          productType,
          description,
          brandType,
          price,
          warranty)
        const storageRef = ref(storage,`product-images${productType.toUpperCase()}/${Date.now()}`)
        // console.log(storageRef._location.path);
        uploadBytes(storageRef,productImage).then(()=>{
          getDownloadURL(storageRef).then(url=>{
            addDoc(collection(db,`products-${productType.toUpperCase()}`),{
              title,
            productType,
            description,
            brandType,
            price,
            warranty,
            productImage:url,
            })
          })
        })
      }
  return (
<>
<form action="" onSubmit={handleAddProduct}>
    <input type="text" placeholder='title' onChange={(e)=>{setTitle(e.target.value)}}/>
    <input type="text" placeholder='product type' onChange={(e)=>{setProductType(e.target.value)}}/>
    <input type="text" placeholder='brand' onChange={(e)=>{setBrandType(e.target.value)}}/>
    <input type="text" placeholder='warranty' onChange={(e)=>{setWarranty(e.target.value)}}/>
    <input type="file" placeholder='image' onChange={handleImageGether}/>
    <input type="text" placeholder='description' onChange={(e)=>{setDescription(e.target.value)}}/>
    <input type="text" placeholder='price without tax' onChange={(e)=>{setPrice(e.target.value)}}/>
    {/* <input type="textarea"  placeholder='price without tax' onChange={(e)=>{setSpecification(e.target.value)}}/> */}
    <textarea name="" id="" cols="30" rows="2" onChange={(e)=>{setSpecification(e.target.value)}}></textarea>
    <button type='submit' >Submit</button>
    </form>
</>
  )
}

export default AddProduct