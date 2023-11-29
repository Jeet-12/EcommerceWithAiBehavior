import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../Firebase/FirebaseConfig';
import { Link } from 'react-router-dom';

import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

const HomeProductShow = (props) => {
  const [product, setProducts] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productArray = [];
        const path = `products-${props.type.toUpperCase()}`;
        const querySnapshot = await getDocs(collection(db, path));

        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setProducts(productArray);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [props.type]);


  return (
    <>
      <h2 style={{ paddingTop: "8px", paddingLeft: "10px" }}>Best of {props.type} </h2>
      
        <Carousel responsive={responsive} >
          {product.map((item, index) => (
            <>
              <div className="displ-imgcont" key={index}>
                <Link to={`/products/${item.id}/${item.productType}`}>  <img src={item.productImage} alt="" style={{ width: "100%", height: "11rem" }} /></Link>
                <div className="cart-para-caro">
                  <p className='pa'>{item.brandType}</p>
                  <p className='pa' style={{ fontWeight: "bold" }}>From {item.price}</p>
                </div>
              </div>
            </>
          ))}
        </Carousel>
        
    </>
  );
};

export default HomeProductShow;
