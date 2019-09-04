import React from 'react';
import Axios from 'axios';

class SinglePost extends React.Component{
  constructor(props){
    super(props)
    // console.log(this.props.match.params)
    this.state=({
      id:this.props.match.params,
      singleimagedetail:""
    })
  }
  componentWillMount(){
    this.getdata()
  }

  getdata=()=>{
    console.log(this.state.id)
    Axios.post('http://localhost:8080/singlepost',this.state.id).then((res)=>{
      // console.log(res.data)
      this.setState({singleimagedetail:res.data})
      console.log(this.state.singleimagedetail)
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
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">Bharat</div>
                    </div>
                    <div className="list_info">
                      This is an example of a comment. You can create as many comments like this one or sub
                      comments as you like and manage all of your content inside your Account.
                    </div>
                    <input type="button" defaultValue="Reply" className="orng_btn" />
                  </li>
                  <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">Bharat</div>
                    </div>
                    <div className="list_info">
                      This is an example of a comment. You can create as many comments like this one or sub
                      comments as you like and manage all of your content inside your Account.
                    </div>
                    <input type="button" defaultValue="Reply" className="black_btn" />
                    <div className="cmnt_div">
                      <input type="text" defaultValue="Add a Comment" className="cmnt_bx" />
                      <input type="submit" className="sub_bttn" defaultValue="Submit Comment" />
                    </div>
                  </li>
                  <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">Bharat</div>
                    </div>
                    <div className="list_info">
                      This is an example of a comment. You can create as many comments like this one or sub
                      comments as you like and manage all of your content inside your Account.
                    </div>
                    <input type="button" defaultValue="Reply" className="orng_btn" />
                  </li>
                  <li>
                    <div className="cmnt_div1">
                      <input type="text" defaultValue="Enter your Comment" className="cmnt_bx1" />
                      <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
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