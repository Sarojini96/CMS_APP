import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

//Import link to routing to other components
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getpost } from "./UserFunctions";

import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: [],
    };
  }

  componentDidMount() {
    getpost().then((response) => {
      console.log(response);
      this.setState({
        loading: false,
        posts: response.data.posts,
      });
      console.log(this.state.posts);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">WELCOME</h1>
                    </div>
          </div>
          <div className="jumbotron mt-5">

          {this.state.loading ? (
            <div>Loading post...</div>
          ) : (
            <table className="table col-md-6 mx-auto">
              <tbody >
                {this.state.posts.map((post) => {
                  return (
                    <Card>
                      <Card.Header as="h5">{post.post_title}</Card.Header>
                      <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>{post.post_full}</Card.Text>
                        <footer className="blockquote-footer">
                        Admin famous in <cite title="Source Title">Source Title</cite>
      </footer>                      </Card.Body>
                    </Card>
                  );
                })}
              </tbody>
            
            </table>
          )}
        </div>
        </div>
    );
  }
}

export default Landing;
