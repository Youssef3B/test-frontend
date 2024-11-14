import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const PostContext = createContext();

function PostProvider({ children }) {
  const [AllPosts, setAllPosts] = useState([]);
  const [post, setPost] = useState();
  async function createPost(data) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/poste`;
    try {
      const res = await axios.post(url, data);
      if (res) {
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPosts() {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/poste`;
    try {
      const res = await axios.get(url);
      if (res) {
        setAllPosts(res.data);
      }
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response ? error.response.data : error.message
      );

      console.log(error);
    }
  }

  async function getPostFromHisId(id) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/poste/${id}`;
    try {
      const res = await axios.get(url);
      if (res) {
        setPost(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/poste/${id}`;
    try {
      const res = await axios.delete(url);
      if (res) {
        console.log("post deleted succufully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function editPost(id, data) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/poste/${id}`;
    try {
      const res = await axios.put(url, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart
        },
      });
      if (res) {
        console.log("Post edited successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PostContext.Provider
      value={{
        createPost,
        AllPosts,
        getAllPosts,
        getPostFromHisId,
        post,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("User Context used outside the Post Provider");
  }
  return context;
}

export { usePost, PostProvider };
