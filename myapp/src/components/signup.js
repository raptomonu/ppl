import React from "react";
import axios from 'axios';
import Container from './container';
import {Link} from 'react-router-dom'; 
class Signup extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      mail:"",
      firstname:"",
      lastname:"",
      message:""
    };
  }

  
  componentWillMount(){
    
    this.verifytoken();
 }
 verifytoken=()=>{
  let tok=localStorage.getItem("token")
        
        console.log("verify token")
        axios.post('http://localhost:8080/verifytoken',{},{
            headers:{
                authorization : `JWT ${tok}`
            }
        }).then((res)=>{
            if(res.data.done===true){
              this.props.history.push('/timeline')
            }
          
            
        })
 }
eventHandler=(e)=>{
  const { name, value } = e.target
  this.setState({ [name]: value })
  
}
submit =  (e) =>
{
e.preventDefault();
  console.log("this is the state",this.state);
 axios.post('http://localhost:8080/signup',this.state).then((res)=>{

this.setState({message:res.data});
    console.log(res.data)
  })
  

  
}
render(){
    return(
      <>
        <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <form onSubmit={this.submit}>
                <ul>
                 
                  <li><span>Username</span><input type="text"   onChange={this.eventHandler} name="username" placeholder="Enter your username" required /></li>
                  <li><span>Password</span><input minLength="6" type="password" onChange={this.eventHandler} name="password" placeholder="Enter your password" required/></li>
                  <li><span>Email</span><input type="email" onChange={this.eventHandler} name="mail"  placeholder="Enter your email" required/></li>
                  <li><span>First Name</span><input type="text"  onChange={this.eventHandler} name="firstname" placeholder="Enter your first name" required/></li>
                  <li><span>Last Name</span><input type="text"  onChange={this.eventHandler} name="lastname" placeholder="Enter your last name"  required/></li>
                  <li><input type="checkbox" />I agree to Term &amp; Conditions</li>
                  <li><input type="submit" defaultValue="Register" onSubmit={this.submit}/></li>
                </ul>
                </form>
                <h1>{this.state.message}</h1>
                <div className="addtnal_acnt">I already have an account.<Link to="/login">Login My Account !</Link></div>
              </div>
            </div>
            <Container/>
            </>
    );

}
}
export default Signup;
