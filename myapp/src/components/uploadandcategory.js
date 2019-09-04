import React from 'react';
import Dropzone from 'react-dropzone';

class Uploadandcategory extends React.Component{
    render(){
        return(
        <div>
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
                  <select name="category" id="category" onChange={this.handleonchange}>
                    
                    
                    
                    {/* dropdown */}
                    
                      {
                        (this.state.categorycollection).map((item)=>
                        <option value="dog">{item.categoryname}</option>)
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
          
        </div>
        );
    }
}
export default Uploadandcategory;