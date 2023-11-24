import React, { useEffect, useState } from 'react'

import { collection, getDocs } from 'firebase/firestore' // Note the change here
import { db } from '../Firebase/FirebaseConfig'
import ShowProducts from './ShowProducts'
import Navbar from '../Component/Navbar'



const AllProduct = (props) => {
    const [products, setProducts] = useState([])

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
    }, [props.type]); // Include props.type in the dependency array if it's used inside useEffect

    return (
        <div className="allproduct-container">
            <Navbar />
            <div className="allproduct-conatiner-items">
               {products.map((item,index)=>{
               return(               
                 <ShowProducts product={item} key={index}/>)
               })

               }
                
            </div>
        </div>
    );
}

export default AllProduct;
