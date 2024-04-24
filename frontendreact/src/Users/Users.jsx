import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../User/User';
import { Container, Row } from 'react-bootstrap';



function Users() {
    
    const [users,setusers]= useState([]);
    const TOKEN="64b879e5f3ac18700a60fe2f";
    const url = 'https://dummyapi.io/data/v1/user?limit=10';
    const headers={
        'app-id':TOKEN
    }

    useEffect(()=>{
        (async()=>{
            const {data}= await (await axios.get(url,{headers})).data;
            console.log(data);
            setusers(data);
        })()
    }, [])
  return (
    <>
    <Container>
       <Row>
        {users.map(user=><User key={user.id} user={user} />)}
       </Row>
    </Container>
    </>
      )
    
      
  
}


export default Users