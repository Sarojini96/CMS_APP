import React,{useState} from 'react';
//bootstrap
//axios for api request
import axios from 'axios';
import { addpost } from './UserFunctions'


class AddUser extends React.Component {

  constructor() {
    super()
    this.state = {
      post_id: '',
      post_title: '',
      post_full: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
}

onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
}

onSubmit (e) {
    e.preventDefault()

    const newPost = {
      post_id: this.state.post_id,
      post_title: this.state.post_title,
      post_full: this.state.post_full,
    }

    addpost(newPost).then(response => {
        this.props.history.push("/")
        console.log(response)
      })
   
}


  render() {
    const { data } = this.props.location
    return (
    
      <div className="container">
      <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">New post</h1>
                  <div className="form-group">
                      <label htmlFor="post_id">post_id</label>
                      <input type="text"
                          className="form-control"
                          name="post_id"
                          placeholder="post id"
                          value={this.state.post_id}
                          onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="post_title"> post_title</label>
                      <input type="text"
                          className="form-control"
                          name="post_title"
                          placeholder="Enter your title"
                          value={this.state.post_title}
                          onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="post_full">Description</label>
                      <textarea type="text"
                          className="form-control"
                          name="post_full"
                          placeholder="Write your content here"
                          value={this.state.post_full}
                          onChange={this.onChange} />
                  </div>
                  
                  

                  <button type="submit" className="btn btn-lg btn-primary btn-block"
                                             >
                     Post
                     
                  </button>
              </form>
          </div>
      </div>
      
  
  </div>
      
)
};
}
export default AddUser;
