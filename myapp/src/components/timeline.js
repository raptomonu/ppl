import React, { dropzoneRef } from "react";
import Axios from "axios";
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadfile: null,
      uploadfilecategory:null,
      visible: false,
      categoryvisible:false,
      categoryname:"",
      category: "",
      title: "",
      name: "",
      username:"",
      imagecollection: [],
      categorycollection:[],
      img:"",
      data:"",
      like:"",
      loginid:""
      


    }
  }

  componentDidMount=()=>{
    this.verifytoken();
    this.getDataPost();
    this.getDataCategory();
    console.log("hello")
  }


  // get uploaded post data for timeline 
  getDataPost=()=>{
    Axios.post("http://localhost:8080/postload").then((res)=>{
      this.setState({imagecollection:res.data})
      // console.log(res.data)
    })
  }
  
  
  //get category data for timeline from database 
  getDataCategory=()=>{
    Axios.post("http://localhost:8080/categoryload").then((res)=>{
      this.setState({categorycollection: res.data})
    })
  }

  // token verify before render
  verifytoken=()=>{
    let tok=localStorage.getItem("token")
        
        console.log("verify token")
        Axios.post('http://localhost:8080/verifytoken',{},{
            headers:{
                authorization : `JWT ${tok}`
            }
        }).then((res)=>{
          if(res.data.name==='JsonWebTokenError'){
            this.props.history.push('/login')
        }
        else if(res.data.done===true){
          console.log("when verified token then res data",res.data)
          this.setState({username:res.data.name,loginid:res.data.id})
          this.props.history.push('/timeline')
        }
           
          
        })
  }

// like button

  like=(e)=>{
    e.preventDefault()
  console.log("when like button clicked",e.currentTarget.id,this.state.loginid)  
  Axios.post('http://localhost:8080/like',{postid:e.currentTarget.id,id:this.state.loginid})
  .then((res)=>{
    console.log("liked status",res.data)
    this.getDataPost();
    this.setState({like:res.data.likecount})
    
  })


  }
  //toggle for upload post  
  
  toggle = () => {
    if (this.state.visible === true) {
      this.setState({ visible: false })
    }
    else {
      this.setState({ visible: true })
    }
  }

  // toggle for addcategory

  categorytoggle=()=>{
    if(this.state.categoryvisible===true){
      this.setState({categoryvisible:false})
    }
    else{
      this.setState({categoryvisible:true})
    }
  }

  // handle upload post  ondrop

  handleondrop = (files) => {

    this.setState({
      uploadfile: files[0]
    })
    
  }


  // handle category image ondrop 
  handleondropcategory=(files)=>{
      
    this.setState({
      uploadfilecategory:files[0]
    })
  }

  // handle all input 

  handleonchange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  // handle image upload in timeline

  handleonsubmit = (e) => {
    e.preventDefault();
    console.log("uplaod state ==========", this.state)
    let tok=localStorage.getItem("token")
    
    const data = new FormData()
    data.append("data", this.state.uploadfile);
    data.append("title", this.state.title);
    data.append("category", this.state.category);
    data.append("token",tok)
    Axios.post('http://localhost:8080/uploadimage', data)
      .then((res) => {
        this.setState({ imagecollection: res.data })
        console.log("data from router =====:", this.state.imagecollection)


      }).catch((err) => {
        console.log(err)
      })

  }

  // handle add category


  handleonsubmitcategory = (e) => {
    e.preventDefault();
    const formData=new FormData()
    formData.append("data",this.state.uploadfilecategory)
    formData.append("categoryname",this.state.categoryname)
    Axios.post('http://localhost:8080/uploadcategory',formData)
    .then((res)=>{
      console.log("this is data",res.data)
      this.setState({categorycollection: res.data})

    }).catch=(err)=>{
      console.log(err.stack)
    }
  }

  // Loggin out 

  logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("loginid");
    this.props.history.push('/login')

  }
 

  render() {
    return (
      <div className="container">

        <div className="content">
          <div className="content_rgt">
            
            
            
            {/* dropzone for upload post button  */}

            <div className="rght_btn" onClick={this.toggle}> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
            {this.state.visible ?
              <div>
                <form onSubmit={this.handleonsubmit}>
                  <Dropzone multiple={false}
                    accept="image/*" onDrop={this.handleondrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>:<img src={this.state.uploadfile} />
                        </div>

                      </div>

                    )}
                  </Dropzone>
                  <select name="category" id="category"  onChange={this.handleonchange}>
                    
                  {/* <option defaultValue >Choose here category</option> */}
                    
                    {/* dropdown */}
                    
                      {
                        (this.state.categorycollection).map((item)=>
                        <option >{item.categoryname}</option>)
                      }
                    


                    {/* end of dropdown */}
                    
                  </select><br />
                  Title<input type="text" name="title" onChange={this.handleonchange} required />

                  <button >Upload</button>
                </form>

              </div>

              : false}



              {/* this is category   */}




            <div className="rght_btn" onClick={this.categorytoggle} > <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Add Category</a> </div>
            {this.state.categoryvisible===true?
            <div>
              <form onSubmit={this.handleonsubmitcategory}>
            <Dropzone multiple={false}
                    accept="image/*" onDrop={this.handleondropcategory}>
                    {({ getRootProps, getInputProps }) => (
                      <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>:<img src={this.state.uploadfilecategory}/>
                        </div>
    
                      </div>

                    )}
                  </Dropzone>
                  {/* <br/> */}
                  CategoryName
                  <input type="text" name="categoryname" required onChange={this.handleonchange}></input>
                  <button>Upload</button>
                </form>
                  </div> 
            :false}


            {/* end  of   category */}


            {/*category list here */}

            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
              <div className="rght_list">
                <ul>
                  <div>
                  {(this.state.categorycollection).map((item)=>
                  <li><a href="#"><span className="list_icon"><img src={"http://localhost:8080/" + (item.imagename)} alt="up" /></span> {item.categoryname}</a></li>
                  )}
                  </div>



                </ul>
              </div>
            </div>
            
          </div>
          <div className="content_lft">
            <div className="contnt_1">
              <div className="list_1">
                <ul>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Friends</li>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Flaged</li>
                </ul>
              </div>
              <div className="timeline_div">
                <div className="timeline_div1">
                  <div className="profile_pic">
                    <img src="images/timeline_img1.png" />
                    <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                  </div>
                  <div className="profile_info">
                    <div className="edit_div"><p onClick={this.logout}>Logout</p></div>
                    <div className="profile_form">
                      <ul>
                        <li>
                          <div className="div_name1">Name :</div>
                          <div className="div_name2">{this.state.username}</div>
                        </li>
                        {/* <li>
                          <div className="div_name1">Sex :</div>
                          <div className="div_name2">Female</div>
                        </li> */}
                        <li>
                          <div className="div_name1">Description :</div>
                          <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                            or sub comments as you like and manage all of your content inside Account.</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="timeline_div2">
                  <ul>
                    <li><a href="#" className="active">Timeline    </a></li>
                    <li><a href="#">About  </a></li>
                    <li><a href="#">Album</a></li>
                    <li><a href="#"> Pets</a></li>
                    <li><a href="#">My Uploads </a></li>
                  </ul>
                </div>
              </div>
            </div>
            

            {/* upload block  */}
            
            
            <div>
            {(this.state.imagecollection).map((item)=>
            
        
            <div className="contnt_2">
              
              <div className="div_a">
                <div className="div_title">{item.title}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{item.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft"><img src="images/img_6.png" />{item.username}</div>
                  <div className="div_top_rgt"><span className="span_date">{item.date}</span><span className="span_time">{item.time}</span></div>
                </div>
                <Link to={{pathname:'/singlepost/'+ item._id}}>
                <div className="div_image"><img src={"http://localhost:8080/" + (item.imagename)} alt={this.state.data}/></div>
                </Link>
                <div className="div_btm">
                  <div className="btm_list" >
                    <ul>
                    
                      <li  ><a href="#" ><span className="btn_icon" ><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                      <li><a href="#" ><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                      {/* like button  */}
                       <li><a href="#" onClick={this.like} id={item._id}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{item.likedby.length}Like</a></li>
                   

                      <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{item.comment.length} Comments</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            )}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default Timeline;
