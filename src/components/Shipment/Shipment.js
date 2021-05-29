import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    
        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data =>{ console.log('form submitted', data)
  const savedCart = getDatabaseCart();
  const orderDetails = {...loggedInUser, products: savedCart, shipment:data, orderTime: new Date()}; 
  fetch('https://lit-ridge-52992.herokuapp.com/addOrder' , {
    method:'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(orderDetails)
  })
  .then( res => res.json())
  .then( data => {
    if (data) {
      processOrder();
      alert('Your order place successfully');
    }
  }
  )};



  console.log(watch("example")); 
  console.log(loggedInUser.name);

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
         
        
       <input  defaultValue={loggedInUser.name}   {...register("name",   { required: true })}  placeholder="Your Name" />
       
      {errors.name && <span className="error">Name is required</span>}
      
      
      <input defaultValue={loggedInUser.email} {...register("email", { required: true } )} placeholder="Your Email" />
      {errors.email && <span className="error">Email is required</span>}
      
      <input {...register("address", { required: true })} placeholder="Your Address"/>
      {errors.address && <span className="error">Address is required</span>}
      <input {...register("phone", { required: true })} placeholder="Your Phone Number"/>
      {errors.phone && <span className="error">Phone Number is required</span>}
      
      <input type="submit" />
    </form>
    
  );
  
};
export default Shipment;