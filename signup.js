import React from 'react';
import './App.css';
import axios from 'axios';
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
  this.eventHandler=this.eventHandler.bind(this); 
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
  render()
{
  return (
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
                <div className="addtnal_acnt">I already have an account.<a href>Login My Account !</a></div>
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



export default Signup;
