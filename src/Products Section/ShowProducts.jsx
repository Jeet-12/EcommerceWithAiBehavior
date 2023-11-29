import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ShowProducts = (props) => {
  const descriptionWords = props.product.description.split(' ').slice(0, 20);
  const truncatedDescription = descriptionWords.join(' ');
  console.log(props.product.id)
  return (
    <>
        {/* <div className="product-showcontainer">
            <img src={props.product.email} alt="" />
            <p>buy now {props.product.brandType }</p>
            <p>add to cart</p>
        </div> */}
        


    <Card style={{ width: '18rem',marginRight:"1rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{props.product.title}</Card.Title>
        <Card.Text>
        {truncatedDescription}
        </Card.Text>
        <Link to={`/products/${props.product.id}/${props.product.productType}`}>  <Button variant="primary" >Know More</Button></Link>
      </Card.Body>
    </Card>
 
    </>
  )
}

export default ShowProducts