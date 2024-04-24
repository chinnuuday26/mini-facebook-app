import logo from './logo.svg';
import React from 'react';
import {BrowserRouter, Routes, Route, Link, } from 'react-router-dom';
import './App.css';
import Mycomponent from './MyComponent/Mycomponent';
import MyNavbar from './MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users/Users';
import Signup from './Signup/Signup';

function App() {
  const name="uday";
  return (
    <BrowserRouter>
  
    <MyNavbar/>

    <Routes>
      <Route path='/' element={<Mycomponent name={name}/>}/>
      {/*<Route path='/home' element={<MyNavbar/>}/>*/}
      <Route path='/users' element={<Users/>}/>
      <Route path='/signup' element={<Signup/>} />

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
