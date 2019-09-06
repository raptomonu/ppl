import React from 'react';
import Axios from 'axios';

class SinglePost extends React.Component{
  constructor(props){
    super(props)
    // console.log(this.props.match.params)
    this.state=({
      id:this.props.match.params,
      singleimagedetail:"",
      like:"",
      comment:"",
      commentlist:[],
      loginid:localStorage.getItem("loginid")
    })
  }
  
  componentDidMount(){
    this.getdata()
  }

  getdata=()=>{
    console.log("login id ",this.state.loginid)
    Axios.post('http://localhost:8080/singlepost',this.state.id).then((res)=>{
      console.log("single post on load data",res.data)
      this.setState({singleimagedetail:res.data,
                      like:res.data.likedby.length,
                    commentlist:res.data.comment,
                  })
      console.log("this is single post comment status",this.state.commentlist)
    })
  }


  handleonchange=(e)=>{
    this.setState({comment:e.target.value})
  }

  handleonsubmit=(e)=>{
    e.preventDefault();
    // console.log(this.state)
    Axios.post('http://localhost:8080/commentupload',this.state).then((res)=>{
      console.log(res.data)
      this.getdata()
    })
  }

    render(){
        return(
            <div>
          
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_05.png" alt="up" /></span> Others</a></li>
                  </ul>
                </div>
              </div>
              
            </div>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{this.state.singleimagedetail.title}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{this.state.singleimagedetail.category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="/images/img_6.png" />{this.state.singleimagedetail.username}</div>
                    <div className="div_top_rgt"><span className="span_date">{this.state.singleimagedetail.date}</span><span className="span_time">{this.state.singleimagedetail.time}</span></div>
                  </div>
                  <div className="div_image"><img src={"http://localhost:8080/" + (this.state.singleimagedetail.imagename)} alt='not found image'/></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{this.state.like}Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.commentlist.length} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  
              {this.state.commentlist.map((item)=>
                  <li>
                    
                <div>
                    <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">{item.username}</div>
                    </div>
                    <div className="list_info">
                     {item.text}
                      </div>
                      </div>
                    
                  </li>
                    )}

                  <li>
                    <div className="cmnt_div1">
                      <form onSubmit={this.handleonsubmit}>

                      <input onChange={this.handleonchange} type="text" placeholder="Type your comment" className="cmnt_bx1" />
                      <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
                    </form>
                      </div>
                  </li>
                </ul>
                <div className="view_div"><a href="#">View more</a></div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
        );
    }

}

export default SinglePost;