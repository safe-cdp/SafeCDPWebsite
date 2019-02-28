import React from "react";

import axios from "axios";

import { FiX } from "react-icons/fi";

const defaultImg = require("../../images/profile/default.png");
const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

const Comment = props => {
  const handleDelete = _ => {
    axios
      .delete(BACKEND + "/comments/" + props.comment.id, {
        data: { id: props.comment.id, token: props.user }
      })
      .then(res => props.unmountMe());
  };
  return (
    <div className="comment">
      {props.verifyUser(props.user) ? (
        props.verifyUser(props.user).admin ? (
          <span onClick={handleDelete}>
            <FiX className="comment_delete" size="10px" />
          </span>
        ) : null
      ) : null}
      <img
        className="comment_avatar"
        src={props.comment.avatar || defaultImg}
        alt=""
      />
      <span className="comment_user">{props.comment.username}</span>
      <span className="comment_content">{props.comment.content}</span>
    </div>
  );
};

export default Comment;
