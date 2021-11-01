import { React, Component } from "react";
import postService from "../services/postService";
import PageHeader from "./common/pageHeader";
import Post from "./post";

class PostsByCategory extends Component {
  state = {
    nonSortedPosts: [],
    posts: [],
  };

  async componentDidMount() {
    const chosenCategory = this.props.match.params.id;
    const { data } = await postService.getByCategory(chosenCategory);
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

    const chosenCategory = this.props.match.params.id;
    return (
      <div className="container">
        {!!posts.length && (
          <div className="row">
            <div className="col-12 mb-4">
              <PageHeader titleText={`All posts about ${chosenCategory}`} />
            </div>

            <select
              className="form-select p-2 rounded mb-3"
              aria-label="Default select example"
              onChange={ e => {
                let sortPosts =  postService.sortPostsBy(nonSortedPosts, e.target.value);
                // console.log("non sorted:", nonSortedPosts);
                // console.log("sorted:", sortPosts);
                this.setState({ posts: sortPosts});
              }}
            >
              <option defaultValue value="NEWEST">Sort by Newest</option>
              <option value="OLDEST">Sort by Oldest</option>
              <option value="LIKES">Sort by Likes</option>
              <option value="COMMENTS">Sort by Comments</option>
            </select>
          
            <div className="col-12">
              {posts.map((post, index) => (
                <Post key={index} post={post} />
              ))}
            </div>
          </div>
        )}
        {!posts.length && (
          <div className="row">
            <div className="col-12 mb-4">
              <PageHeader
                titleText={`There no posts about '${chosenCategory}' yet...`}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PostsByCategory;
