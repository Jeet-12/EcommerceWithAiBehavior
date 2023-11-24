import React from 'react'

const ShowProducts = (props) => {
    console.log(props.product)
  return (
    <>
        <div className="product-showcontainer">
            <img src={props.product.productImage} alt="" />
            <p>buy now</p>
            <p>add to cart</p>
        </div>
    </>
  )
}

export default ShowProducts