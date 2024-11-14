import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LikeContext = createContext();

function LikeProvider({ children }) {
  const [likes, setLikes] = useState([]);

  async function getAllLikes() {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/likes`;
    try {
      const res = await axios.get(url);
      if (res) {
        setLikes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addLike(data) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/likes`;
    try {
      const res = await axios.post(url, data);
      if (res) {
        console.log("Like Added Success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLike(userId, postId) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/likes`;
    try {
      const res = await axios.delete(url, { data: { userId, postId } });
      if (res) {
        console.log("Like deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllLikes();
  }, []);
  return (
    <LikeContext.Provider value={{ getAllLikes, likes, addLike, deleteLike }}>
      {children}
    </LikeContext.Provider>
  );
}

function useLike() {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error("User Context used outside the Post Provider");
  }
  return context;
}

export { useLike, LikeProvider };
