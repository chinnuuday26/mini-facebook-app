import React, { Component } from 'react'
import "./MyComponent.css"

export default class Mycomponent extends Component {
  constructor(){
      super();
      this.state={
        displayLabel:true,
        name:''
        
      }

  }
  render() {

    //console.log(this.props);
    const clickhandler=(e)=>{
        const {name}=this.state;
        alert(`Hello ${name}`);
    }

    const changeHandler=(e)=>{
       console.log(e.target.value);
       this.setState({name:e.target.value});
       
    }
    const toggleVisibility= (e)=>{
        console.log(e.target);
        console.log(this.state);
        this.setState({displayLabel:!displayLabel});
        console.log("Ncrct State",this.state);

    }

    const {displayLabel}=this.state;


    return (
    <>  
      {this.state.displayLabel?<h1>Mycomponent</h1>: null}
      <input className='input-style' type="text" onChange={changeHandler}/>
      <button onClick={clickhandler}>click me</button>
      <button onClick={toggleVisibility}>{this.state.displayLabel?"HIde Label":"Display Label"}</button>
    </>
    );
  
}
}
