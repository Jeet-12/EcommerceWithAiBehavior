import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../Firebase/FirebaseConfig'
const AddProduct = () => {
  const [title, setTitle] = useState('')
  const [productType, setProductType] = useState('')
  const [brandType, setBrandType] = useState('')
  const [warranty, setWarranty] = useState('')
  const [description, setDescription] = useState('')
  const [imageError, setImageError] = useState('')
  const [price, setPrice] = useState('')
  const [specification, setSpecification] = useState('')
  const [productImage, setProductImage] = useState('')
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
  const types = ["image/png", "image/jpg", "image/jpeg", "image/PNG"];

  const handleImageGether = (e) => {
    console.log(e.target.files[0]);
    let selectedImage = e.target.files[0];
    console.log(selectedImage);
    if (selectedImage) {
      if (selectedImage && types.includes(selectedImage.type)) {

        setProductImage(selectedImage);
        setImageError("")
      }
      else {
        setImageError("Select a valid image type(png,jpg)");
      }
    }
    else {
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
  const handleAddProduct = (e) => {

    e.preventDefault();

    console.log(title,
      productType,
      description,
      brandType,
      price,
      warranty)
    const storageRef = ref(storage, `product-images${productType.toUpperCase()}/${Date.now()}`)
    // console.log(storageRef._location.path);
    uploadBytes(storageRef, productImage).then(() => {
      getDownloadURL(storageRef).then(url => {
        addDoc(collection(db, `products-${productType.toUpperCase()}`), {
          title,
          productType,
          description,
          brandType,
          price,
          warranty,
          productImage: url,
          specification
        })
      })
    })
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0rem" }}>
        <div style={{ width: "80%" }}>
          <h2 style={{ padding: "1rem 0px" }}>Add Products</h2>
          <form action="" onSubmit={handleAddProduct} style={{ padding: "1rem", boxShadow: "1px 1px 10px grey",borderRadius:"5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "1rem 0rem" }}>
                <label htmlFor="" className='padtb-4px'> Title :- &nbsp;
                  <input type="text" className='inp-20' placeholder='title' onChange={(e) => { setTitle(e.target.value) }} /> </label>
                <label htmlFor="" className='padtb-4px'> Brand :- &nbsp; <input type="text" className='inp-20' placeholder='brand' onChange={(e) => { setBrandType(e.target.value) }} /></label>
                <label htmlFor="" className='padtb-4px'> Price :- &nbsp; <input type="text" className='inp-20' placeholder='price without tax' onChange={(e) => { setPrice(e.target.value) }} /></label>
              

              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "1rem 0rem" }}>
                <label htmlFor=""> Warranty :- &nbsp; <input type="text" className='inp-20' placeholder='warranty' onChange={(e) => { setWarranty(e.target.value) }} /></label>
                <label htmlFor=""> Product Type :- &nbsp;   <input type="text" className='inp-20' placeholder='product type' onChange={(e) => { setProductType(e.target.value) }} /></label>

                <label htmlFor=""> Description :- &nbsp; <input type="text" className='inp-20' placeholder='description' onChange={(e) => { setDescription(e.target.value) }} /></label>
                


              </div>
            </div>
            <label htmlFor="" className='padtb-4px' style={{display:"flex",justifyContent:"space-between"}}>Specification :- &nbsp; <textarea name="" id="" cols="140" rows="4" onChange={(e) => { setSpecification(e.target.value) }}></textarea></label>
 <label htmlFor="" style={{display:"flex",justifyContent:"center",width:"100%",marginTop:"1rem"}}><input className='padtb-4px' type="file" placeholder='image' onChange={handleImageGether} /></label>



    <div style={{display:"flex",justifyContent:"center",margin:"2rem 0px",marginBottom:"0.5rem"}}>
            <button type='submit' style={{padding:"0.5rem 2rem",borderRadius:"5px",backgroundColor: "#04AA6D",color:"white",fontWeight:"bold"}} >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddProduct