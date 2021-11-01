import { Component } from "react";
import PageHeader from "./common/pageHeader";
import Post from "./post";
import userService from "../services/userService";
import postService from "../services/postService";
import { Link } from "react-router-dom";
import $ from 'jquery';

class Favorites extends Component {
  state = {
    nonSortedPosts: [],
    posts: [],
  };

  async componentDidMount() {
    const { data } = await userService.getFavorites();

    if (data.length) {
      this.setState({
        nonSortedPosts: data,
        posts: postService.sortPostsBy(data, "NEWEST"),
      });
    }
  }

  render() {
    const {
      state: { nonSortedPosts, posts },
    } = this;

    return (
      <div className="container">
        <div className="col-12 mb-4">
          <PageHeader titleText="Your Favorites Posts" />
        </div>
        <div className="col-12 my-3 dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="sortButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort Posts By:
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    $("#sortButton").html("Sort By Newest");
                    this.setState({posts: postService.sortPostsBy(nonSortedPosts, "NEWEST")});
                  }}
                >
                  Newest
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    $("#sortButton").html("Sort By Oldest");
                    this.setState({posts: postService.sortPostsBy(nonSortedPosts, "OLDEST")});
                  }}
                >
                  Oldest
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    $("#sortButton").html("Sort By Likes");
                    this.setState({posts: postService.sortPostsBy(nonSortedPosts, "LIKES")});
                  }}
                >
                  Likes
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    $("#sortButton").html("Sort By Comments");
                    this.setState({posts: postService.sortPostsBy(nonSortedPosts, "COMMENTS")});
                  }}
                >
                  Comments
                </button>
              </div>
            </div>
        <div className="row">
          {!!posts.length &&
            posts.map((post) => <Post key={post._id} post={post} />)}
          {!posts.length && (
            <div className="row">
              <div className="col-12">
                <p>There no favorites cards yet.</p>
                <Link to="/category/all-categories">
                  {" "}
                  Click here to All-posts
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
