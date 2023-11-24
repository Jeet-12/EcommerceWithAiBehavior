import React from 'react'

const ShowCardCart = (props) => {
    console.log(props.itemdata.id.product.price)
  return (
    <p>{props.itemdata} </p>
    
  )
}

export default ShowCardCart