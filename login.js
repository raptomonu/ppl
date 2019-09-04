import React from 'react';
import './App.css';
import axios from 'axios';

class Login extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            mail:"",
            password:"",
            sender:""
        };
        this.handlelogin=this.handlelogin.bind(this);
        this.handleInput=this.handleInput.bind(this);
    }
    handleInput(e){
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handlelogin(e){
        e.preventDefault();
        console.log("this is login detail",this.state)
        axios.post("http://localhost:8080/login",this.state).then((res)=>{
            console.log(res.data)
            this.setState({sender: res.data});
        })
    }
    render(){
        return(
            <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" href>PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><a tabIndex={-1} href="#">My Profile</a></li>
                  <li><a tabIndex={-1} href="#">Message Box</a></li>
                  <li><a tabIndex={-1} href="#">Change Language</a></li>
                  <li className="divider" />
                  <li><a tabIndex={-1} href="#">
                      <input type="text" placeholder="search" />
                    </a></li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active"> <a href>Home</a> </li>
                  <li className> <a href>E-Coupons</a> </li>
                  <li className> <a href>E-Brands</a> </li>
                  <li className> <a href>Resuse Market</a> </li>
                  <li className> <a href>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo"><a href="#"><img src="images/logo.png" /></a></div>
            <div className="navigatn">
              <ul>
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#"> E-Coupons </a></li>
                <li><a href="#">E-Brands </a></li>
                <li><a href="#"> Resuse Market </a></li>
                <li><a href="#"> Lost and Found</a></li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div"><img src="images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
            <div className="info_div">
              <div className="image_div"> <img src="images/pic.png" /> </div>
              <div className="info_div1">Me</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
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
                <h1>{this.state.sender}</h1>
                <div className="addtnal_acnt">I do not have any account yet.<a href>Create My Account Now !</a></div>
                
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" /> </div>
          </div>
        </div>
        <div className="clear" />
        <div className="footr">
          <div className="footr_lft">
            <div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
            <div className="footer_div2"><a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a></div>
          </div>
          <div className="footr_rgt">
            <ul>
              <li><a href="#"><img src="images/social_1.png" /></a></li>
              <li><a href="#"><img src="images/social_2.png" /></a></li>
              <li><a href="#"><img src="images/social_3.png" /></a></li>
              <li><a href="#"><img src="images/social_4.png" /></a></li>
            </ul>
          </div>
        </div>
      </div>
        );
    }
}



export default Login;