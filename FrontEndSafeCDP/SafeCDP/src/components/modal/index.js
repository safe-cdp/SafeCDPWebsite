import React from "react";
import axios from "axios";
import moment from "moment";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";

import { FaRegHeart } from "react-icons/fa";
import { FiShare, FiX, FiTrash2 } from "react-icons/fi";
import { ReactComponent as Edit } from "../../images/icons/edit.svg";

import Comments from "../comments";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      post: null,
      edit: "",
      editing: false,
      deleting: false,
      loading: true,
      liked: false
    };
  }
  componentDidMount() {
    if (this.props.post)
      axios.get(BACKEND + "/posts/" + this.props.post.id).then(res =>
        this.setState({
          post: res.data,
          comments: res.data.comments,
          loading: false
        })
      );
  }
  handleChange = e =>
    this.setState({
      [e.target.dataset.name]: e.target.value,
      err: null
    });
  refreshPost = _ =>
    this.props.post &&
    axios
      .get(BACKEND + "/posts/" + this.props.post.id)
      .then(res =>
        this.setState({ post: res.data, comments: res.data.comments })
      );
  checkLoad = _ =>
    this.props.verifyUser(this.props.user) &&
    this.props.verifyUser(this.props.user).id;
  handleMessage = e => {
    e.preventDefault();
    if (this.checkLoad())
      if (this.state.comment)
        axios
          .post(BACKEND + "/comments", {
            content: this.state.comment,
            user_id: this.props.verifyUser(this.props.user).id,
            username: this.props.verifyUser(this.props.user).username,
            avatar: this.props.verifyUser(this.props.user).avatar,
            post_id: this.state.post.id,
            token: this.props.user
          })
          .then(res =>
            axios
              .get(BACKEND + "/posts/" + this.props.post.id)
              .then(res =>
                this.setState({ comments: res.data.comments, comment: "" })
              )
          )
          .catch(err =>
            this.setState({
              err: <div>There was an issue uploading your comment</div>
            })
          );
      else
        this.setState({
          err: <div>There was an issue uploading your comment</div>
        });
    else this.props.history.push("/login");
  };
  handleEdit = e => {
    e.preventDefault();
    if (this.checkLoad())
      axios
        .put(BACKEND + "/posts/" + this.state.post.id, {
          description: this.state.edit,
          likes: this.state.post.likes,
          image: this.state.post.image,
          token: this.props.user
        })
        .then(oRes =>
          axios.get(BACKEND + "/posts/" + this.state.post.id).then(res =>
            this.setState({
              post: res.data,
              comments: res.data.comments,
              comment: "",
              edit: "",
              editing: ""
            })
          )
        )
        .catch(err =>
          this.setState({
            err: <div>There was an issue editing your post</div>
          })
        );
    else this.props.history.push("/login");
  };
  handleDelete = e => {
    e.preventDefault();
    if (this.checkLoad()) {
      axios
        .delete(BACKEND + "/posts/" + this.state.post.id, {
          data: { token: this.props.user }
        })
        .then(oRes => {
          this.props.closeRefresh(this.state.post.id);
          this.props.history.push("/");
        })
        .catch(err =>
          this.setState({
            err: <div>There was an issue deleting your post</div>
          })
        );
    } else this.props.history.push("/login");
  };
  editPost = _ =>
    this.setState(prevState => ({
      edit: this.state.post.description,
      editing: !prevState.editing,
      deleting: false,
      err: null
    }));
  deletePost = _ =>
    this.setState(prevState => ({
      edit: this.state.post.description,
      editing: false,
      deleting: !prevState.deleting,
      err: null
    }));
  close = e => {
    e.stopPropagation();
    this.setState({
      edit: "",
      editing: false,
      deleting: false,
      err: null
    });
  };
  handleLike = _ => {
    if (this.checkLoad()) {
      this.setState({
        liked: true
      });
      axios
        .put(BACKEND + "/posts/" + this.state.post.id, {
          description: this.state.post.description,
          likes: this.state.post.likes + 1,
          image: this.state.post.image
        })
        .then(res => {
          let newPost = this.state.post;
          newPost.likes += 1;
          this.setState({
            post: newPost
          });
        })
        .catch(err =>
          this.setState({
            err: <div>There was an issue liking the post</div>,
            liked: false
          })
        );
    } else this.props.history.push("/login");
  };
  render() {
    return (
      <div className="scroll">
        {this.state.err ? (
          <span className="modal_error">{this.state.err}</span>
        ) : null}
        <div className="fullscreen" onClick={this.props.close}>
          <div onClick={this.props.close}>
            <FiX className="close" size="32px" color="white" />
          </div>
        </div>
        <div
          className="modal"
          style={
            this.state.editing || this.state.deleting
              ? { filter: "brightness(50%)" }
              : null
          }
          onClick={
            this.state.editing || this.state.deleting ? this.close : null
          }
        >
          {this.state.loading ? (
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          ) : (
            <>
              <div className="modal_image_container">
                <img
                  className="modal_image"
                  src={this.state.post ? this.state.post.image : this.props.src}
                  alt="car"
                />
              </div>
              <div className="modal_artist_small">
                <img
                  className="modal_artist_small_pic"
                  src={image}
                  alt="artist"
                />
                {this.props.artist}
              </div>
              <div className="modal_post">
                <div className="modal_artist">
                  <img className="modal_artist_pic" src={image} alt="artist" />
                  {this.props.artist}
                </div>
                <div className="modal_comments">
                  <b>{this.props.artist} </b>
                  {this.state.post ? (
                    <span>{this.state.post.description}</span>
                  ) : null}
                  <Comments
                    comments={this.state.comments}
                    user={this.props.user}
                    verifyUser={this.props.verifyUser}
                    refreshPost={this.refreshPost}
                  />
                </div>
                <div className="modal_icons">
                  {/* <span onClick={this.handleLike}>
                    <FaRegHeart
                      className="modal_icons_icon"
                      fill={this.state.liked ? "red" : "black"}
                      size="24px"
                    />
                  </span> */}
                  {/* <FiShare className="modal_icons_icon" size="24px" /> */}
                  {this.props.verifyUser(this.props.user) ? (
                    this.props.verifyUser(this.props.user).admin ? (
                      <span className="modal_icons_right">
                        <Edit
                          className="modal_icons_icon"
                          size="24px"
                          onClick={this.editPost}
                        />
                        <FiTrash2
                          className="modal_icons_icon"
                          size="24px"
                          onClick={this.deletePost}
                        />
                      </span>
                    ) : null
                  ) : null}
                </div>
                {/* <div className="modal_likes">
                  {this.state.post ? this.state.post.likes : 0} likes
                </div> */}
                <div className="modal_date">
                  {this.state.post
                    ? moment(this.state.post.created_at).fromNow()
                    : null}
                </div>
                <form onSubmit={this.handleMessage}>
                  <input
                    type="text"
                    value={this.state.comment}
                    data-name="comment"
                    placeholder="Add a comment..."
                    onChange={this.handleChange}
                  />
                </form>
              </div>
            </>
          )}
        </div>
        {this.state.editing ? (
          <form className="modal_edit" onSubmit={this.handleEdit}>
            <h2>Edit description</h2>
            <textarea
              className="modal_edit_textarea"
              data-name="edit"
              value={this.state.edit}
              onChange={this.handleChange}
            />
            <button className="modal_edit_button">Submit</button>
          </form>
        ) : null}
        {this.state.deleting ? (
          <form className="modal_delete" onSubmit={this.handleEdit}>
            <h2>Are you sure you want to delete this post?</h2>
            <button
              className="modal_delete_button_delete"
              onClick={this.handleDelete}
            >
              Delete
            </button>
            <div className="modal_delete_button_cancel" onClick={this.close}>
              Cancel
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}
