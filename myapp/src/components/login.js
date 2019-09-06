import React from 'react';
import axios from 'axios';
import Container from './container';
import {Link} from 'react-router-dom'; 

import { isString } from 'util';
class Login extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            mail:"",
            password:"",
            message:""
        };
        this.handlelogin=this.handlelogin.bind(this);
        this.handleInput=this.handleInput.bind(this);
    }
    componentWillMount(){
        // console.log("verify token")
       this.getData();
       this.verifytoken();
    }
    getData=()=>{
        
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
    handleInput(e){
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handlelogin(e){
        e.preventDefault();
        console.log("this is login detail",this.state)
        axios.post("http://localhost:8080/login",this.state).then((res)=>{
            if(isString(res.data)){
                this.setState({message:res.data})
            }
            else{
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("loginid",res.data.loginid) 
                if(res.data.token){
                    this.props.history.push('/timeline')
                }
            }
        })
    }
    render(){
        return(
            <>
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit={this.handlelogin} >
                <ul>
                  <li><span>Email-ID</span><input  type="email" name="mail" onChange={this.handleInput} placeholder="Enter your email" required/></li>
                  <li><span>Password</span><input type="password" minLength="6" name="password" onChange={this.handleInput} placeholder="Enter your password" required/></li>
                  <li><input type="checkbox" />Remember Me</li>
                  <li><input type="submit" defaultValue="Log In" onSubmit={this.handlelogin}/><a href>Forgot Password</a></li>
                </ul>
                </form>
                <h1>{this.state.message}</h1>
                <div className="addtnal_acnt">I do not have any account yet.<Link to="/signup">Create My Account Now !</Link></div>
                
              </div>
              
            </div>
            <Container />
            </>
        );
    }
}
export default Login;