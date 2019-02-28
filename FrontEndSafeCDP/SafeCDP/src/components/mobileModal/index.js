import React from "react";
import axios from "axios";
import moment from "moment";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";

import { FaRegHeart } from "react-icons/fa";
import { FiShare, FiTrash2 } from "react-icons/fi";
import { ReactComponent as Edit } from "../../images/icons/edit.svg";

import Comments from "../comments";
import Error404 from "../Error404";

const override = css`
  display: block;
  border-color: red;
`;

const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");
export default class MobileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      post: null,
      edit: "",
      editing: false,
      deleting: false,
      err: null,
      loading: true,
      liked: false
    };
  }
  componentDidMount() {
    this.props.post &&
      axios.get(BACKEND + "/posts/" + this.props.post.id).then(res => {
        this.setState({
          post: res.data,
          comments: res.data.comments,
          loading: false
        });
      });
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
        .then(oRes => {
          axios.get(BACKEND + "/posts/" + this.state.post.id).then(res => {
            this.setState({
              post: res.data,
              comments: res.data.comments,
              comment: "",
              edit: "",
              editing: ""
            });
          });
        })
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
  handleLike = _ => {
    if (this.checkLoad())
      axios
        .put(BACKEND + "/posts/" + this.state.post.id, {
          description: this.state.post.description,
          likes: this.state.post.likes + 1,
          image: this.state.post.image,
          token: this.props.user
        })
        .then(res => {
          let newPost = this.state.post;
          newPost.likes += 1;
          this.setState({
            post: newPost,
            liked: true
          });
        })
        .catch(err =>
          this.setState({
            err: <div>There was an issue liking the post</div>
          })
        );
    else this.props.history.push("/login");
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
  render() {
    if (this.state.post || this.props.src)
      return (
        <>
          {this.state.err ? (
            <span className="mobile_modal_error">{this.state.err}</span>
          ) : null}
          {this.state.loading ? (
            <div className="mobile_modal_loading">
              <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={this.state.loading}
              />
            </div>
          ) : (
            <>
              <div
                className="mobile_modal"
                style={
                  this.state.editing || this.state.deleting
                    ? { filter: "brightness(50%)" }
                    : null
                }
                onClick={
                  this.state.editing || this.state.deleting ? this.close : null
                }
              >
                <div className="mobile_modal_artist">
                  <img
                    className="mobile_modal_artist_pic"
                    src={image}
                    alt="artist"
                  />
                  {this.props.artist}
                </div>
                <div className="mobile_modal_image_container">
                  <img
                    className="mobile_modal_image"
                    src={
                      this.state.post ? this.state.post.image : this.props.src
                    }
                    alt="car"
                  />
                </div>
                <div className="mobile_modal_post">
                  <div className="mobile_modal_icons">
                    {/* <span onClick={this.handleLike}>
                      <FaRegHeart
                        className="modal_icons_icon"
                        fill={this.state.liked ? "red" : "black"}
                        size="24px"
                      />
                    </span> */}
                    {/* <FiShare size="24px" /> */}
                    {this.props.verifyUser(this.props.user) ? (
                      this.props.verifyUser(this.props.user).admin ? (
                        <span className="mobile_modal_icons_right">
                          <Edit
                            className="mobile_modal_icons_icon"
                            size="24px"
                            onClick={this.editPost}
                          />
                          <FiTrash2
                            className="mobile_modal_icons_icon"
                            size="24px"
                            onClick={this.deletePost}
                          />
                        </span>
                      ) : null
                    ) : null}
                  </div>
                  {/* <div className="mobile_modal_likes">
                    {this.state.post ? this.state.post.likes : 0} likes
                  </div> */}
                  <div className="mobile_modal_date">
                    {this.state.post
                      ? moment(this.state.post.created_at).fromNow()
                      : null}
                  </div>
                  <div className="mobile_modal_comments">
                    {this.state.post ? (
                      <span>
                        <b>{this.props.artist}</b> {this.state.post.description}
                      </span>
                    ) : null}
                    <Comments
                      comments={this.state.comments}
                      user={this.props.user}
                      verifyUser={this.props.verifyUser}
                      refreshPost={this.refreshPost}
                    />
                  </div>
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
          {this.state.editing ? (
            <form className="mobile_modal_edit" onSubmit={this.handleEdit}>
              <h2>Edit description</h2>
              <textarea
                className="mobile_modal_edit_textarea"
                data-name="edit"
                value={this.state.edit}
                onChange={this.handleChange}
              />
              <button className="mobile_modal_edit_button">Submit</button>
            </form>
          ) : null}
          {this.state.deleting ? (
            <form className="mobile_modal_delete" onSubmit={this.handleEdit}>
              <h2>Are you sure you want to delete this post?</h2>
              <button
                className="mobile_modal_delete_button_delete"
                onClick={this.handleDelete}
              >
                Delete
              </button>
              <div
                className="mobile_modal_delete_button_cancel"
                onClick={this.close}
              >
                Cancel
              </div>
            </form>
          ) : null}
        </>
      );
    else return <Error404 />;
  }
}
