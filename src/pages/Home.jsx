import { useEffect, useState } from "react";
import Input from "../components/Input";
import Posts from "../components/Posts";
import { useAuthUser } from "../contexts/AuthContext";
import { useFollower } from "../contexts/FollowerContext";
import { usePost } from "../contexts/PostContext";

function Home() {
  const { AllPosts, getAllPosts } = usePost();
  const { user } = useAuthUser();
  const { allFollowers, getAllFollowers } = useFollower();
  const [postsFiltered, setPostFiltered] = useState([]);
  const [users2, setUsers2] = useState([]);

  useEffect(() => {
    getAllPosts();
    getAllFollowers();
  }, []);

  useEffect(() => {
    if (user && allFollowers) {
      const followedUsers = allFollowers
        .filter((follower) => follower?.userWhoFollow?._id === user._id)
        .map((follower) => follower.userWhoFollowed._id); 
      setUsers2(followedUsers);
    }
  }, [allFollowers, user]);

  useEffect(() => {
    if (AllPosts && users2.length > 0) {
      const filteredPosts = AllPosts.filter((post) =>
        users2.includes(post.user._id)
      );
      setPostFiltered(filteredPosts);
    }
  }, [AllPosts, users2]);

  if(postsFiltered){
    console.log(postsFiltered);
  }

  return (
    <div className="px-8">
      <div>
        <h1 className="font-bold text-2xl my-3">Home</h1>
        <Input />
        <Posts posts={postsFiltered} /> 
      </div>
    </div>
  );
}

export default Home;
