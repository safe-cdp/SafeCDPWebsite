import React from "react";

import Comment from "../comment";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.comments !== props.comments)
      return { comments: props.comments };
    else return null;
  }
  handleChildUnmount = _ => this.props.refreshPost();
  render() {
    return (
      <>
        {this.state.comments.map(comment => {
          return (
            <Comment
              key={"comment" + comment.id}
              comment={comment}
              user={this.props.user}
              verifyUser={this.props.verifyUser}
              unmountMe={this.handleChildUnmount}
            />
          );
        })}
      </>
    );
  }
}
