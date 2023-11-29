import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'

const ShowCardCart = (props) => {
    const [quantity,setQuantity] = useState(1);
    const increasequantity = () =>{
      setQuantity(quantity + 1)
    }
    const decreasequantity = () =>{
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }

  return (
    <>
     
      <img src={props.itemdata.product.productImage}  alt="" />
      <div>
        <p>{props.itemdata.product.title}</p>
        <p>{quantity==1? props.itemdata.product.price:quantity * props.itemdata.product.price}</p>
        <div style={{display:"flex",width:"7rem",justifyContent:"space-around"}}>
       
        <p onClick={decreasequantity} style={{border: "1px solid black",padding: "5px",alignItems:" center",borderRadius: "2rem",display: "flex",fontSize: "15px"}}>-</p>
        <p style={{display:"flex",border:"1px solid black",padding:"5px 16px",borderRadius:"6px"}}>{quantity}</p>
        <p  onClick={increasequantity} style={{border: "1px solid black",padding: "5px",alignItems:" center",borderRadius: "2rem",display: "flex",fontSize: "15px"}}>+</p>
        </div>
      </div>
      
    
    </>
    
  )
}

export default ShowCardCart