import http from "./httpService";
import { apiUrl } from "../config.json";

async function createPost(post) {
        return await http.post(`${apiUrl}/posts`, post);
    }

async function getByCategory(category){
    return await http.get(`${apiUrl}/posts/${category}`)
}

async function getPost(id){
    return await http.get(`${apiUrl}/posts/by_id/${id}`)
}

async function getMyPosts(){
    return await http.get(`${apiUrl}/posts/my-posts`)
}

async function publishComment(comment){
    return await http.post(`${apiUrl}/posts/publish-comment`, comment)
}

async function deletePost(postId){
    return await http.delete(`${apiUrl}/posts/${postId}`)
}

async function editPost(postId, post){
    return await http.put(`${apiUrl}/posts/${postId}`, post)
}

export function sortPostsBy(postsArray, sortBy) {

    //duplicate the array
    let posts = [...postsArray];

    switch (sortBy) {
      case "NEWEST":
        posts.reverse();
        break;
      case "OLDEST":
        break;
      case "LIKES":
        posts.sort((a, b) => {
          return b.numOfLikes - a.numOfLikes;
        });
        break;
      case "COMMENTS":
        posts.sort((a, b) => {
          return b.comments?.length - a.comments?.length;
        });
        break;
      default:
        //newest
        posts.reverse();
        break;
    }

    return posts;
  };


const exportedObject = {
    createPost,
    getByCategory,
    getPost,
    publishComment,
    getMyPosts,
    deletePost,
    editPost,
    sortPostsBy,
}

export default exportedObject;