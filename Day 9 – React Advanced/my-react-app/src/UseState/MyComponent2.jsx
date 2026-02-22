import React,{useState} from 'react'

function MyComponent2() {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState();
  const [comment, setComment] = useState("");
  const [payment, setPayment] = useState("");
  const [shipping, setShipping] = useState("Delivery");

  function handleNameChange (e){
    setName(e.target.value);
  }
  function handleQuantityChange (e){
    setQuantity(e.target.value);
  }
  function handleCommentChange (e){
    setComment(e.target.value);
  }
  function handlePaymentChange (e){
    setPayment(e.target.value);
  }
  function handleShippingChange (e){
    setShipping(e.target.value);
  }
  return (
    <div>
      <input value={name} onChange={handleNameChange} />
      <p>Name: {name}</p>
      
      <input type='number' value={quantity} onChange={handleQuantityChange} />
      <p>Quantity: {quantity}</p>

      <textarea value={comment} onChange={handleCommentChange} placeholder='Enter Your Comment'/>
      <p>Comment: {comment}</p>

      <select value={payment} onChange={handlePaymentChange}>
        <option value="">Select Option</option>
        <option value="Visa">Visa</option>
        <option value="Master Card">Master Card</option>
        <option value="Gift Card">Gift Card</option>
      </select>
      <p>Payment: {payment}</p>

      <label>
        <input value="Pick Up" type="radio" checked={shipping === 'Pick Up'} onChange={handleShippingChange} />
        Pick Up
      </label>
      <br />
      
      <label>
        <input value="Delivery" type="radio" checked={shipping === 'Delivery'} onChange={handleShippingChange}/>
        Delivery
      </label>
      <p>Shipping: {shipping}</p>
    
    </div>
  )
}

export default MyComponent2;
