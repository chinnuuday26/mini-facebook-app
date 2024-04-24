import React from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import "./User.css"

function User(props) {
    const {user:{picture,title,firstName,lastName}}=props;

  return (
    <>
    <Col sm="12" md="6" lg="4">
    <Card className='user'>
      <Card.Body className='d-flex'>
      <img src={picture} />
      <div className='data'>
      <strong>{title.toUpperCase()} {firstName} {lastName}</strong>
      <Button className='data__button'variant='outline-primary'>Add Friend</Button>
      </div>
      </Card.Body>
    </Card>
    </Col>
    </>
  )
}

export default User