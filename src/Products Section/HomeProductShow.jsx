import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/FirebaseConfig';
import { Link } from 'react-router-dom';

const HomeProductShow = (props) => {
    const[product,setProducts] = useState([])
    useEffect(() => {
        const getProduct = () => {
            const productArray = [];
            const path = `products-${props.type.toUpperCase()}`;
            getDocs(collection(db, path)) // Changed getDoc to getDocs and passed collection reference
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        productArray.push({ ...doc.data(), id: doc.id });
                    });
                    setProducts(productArray);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getProduct();
    }, [props.type]);
  return (
    <div>
   {product.map((item,index)=>{
               return(               
                <div className="home-productsshow">
                 <img src={item.productImage} alt="" />
                 <Link to={`/products/${item.id}/${item.productType}`}>More Details</Link>
                 </div>
                 )
              } )}</div>
  )
}

export default HomeProductShow