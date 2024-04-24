import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  './Signup.css';
import { Card } from 'react-bootstrap';

function Register() {

  const [validation, setValidation]= useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false
  })
  
  const [valid,setValid]=useState(false)

  const validate=(e)=>{
    const {value:password}=e.target;
    const lowercase = /(?=.*[a-z])/.test(password);
    const uppercase = /(?=.*[A-Z])/.test(password);
    const number = /(?=.*\d)/.test(password);
    const symbol = /(?=.*[\W_])/.test(password);
    const length = password.length>7;
  

  setValidation({
    lowercase,uppercase,number,symbol,length
  });
  
  const isValid =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[\w\W]{8,}$/.test(password);
  setValid(isValid);
}
  const { lowercase, uppercase, number, symbol, length }= validation;

   return (
    <Card className='m-3 p-3 signup'>
      <Card.Title>Signup</Card.Title>
      <Card.Body>
       <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onKeyUp={e=>{validate(e)}} />
      </Form.Group>
     
      <Button variant="primary" type="submit" disabled={!valid}>
        Submit
      </Button>
      </Form>
     </Card.Body>
     <div className='pwd-strength'>
       <div className={lowercase?'text-sucess':'text-danger'}>Lowercase</div>
       <div className={uppercase?'text-sucess':'text-danger'}>Uppercase</div>
       <div className={number?'text-sucess':'text-danger'}>Number 0-9</div>
       <div className={symbol?'text-sucess':'text-danger'}>Symbol !@#$%^&*()</div>
       <div className={length?'text-sucess':'text-danger'}>Atleast 8 characters</div>
     </div>
    </Card>
  );
}

export default Register