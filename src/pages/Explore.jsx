import { useEffect, useState } from "react";
import Post from "../components/Post";
import Search from "../components/Search";
import { usePost } from "../contexts/PostContext";
import LoadingPost from "../components/LoadingPost";
import { useSave } from "../contexts/SaveContext";

function Explore() {
  const { getAllPosts, AllPosts } = usePost();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      await getAllPosts();
      setLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <div className="my-4 mx-8">
      <Search search={search} setSearch={setSearch} />

      {loading ? (
        <LoadingPost />
      ) : (
        <div className="grid grid-cols-1 gap-x-4 my-4">
          {AllPosts &&
            AllPosts.filter((post) => {
              return search === ""
                ? post
                : post.title.toLowerCase().includes(search.toLowerCase());
            }).map((post) => <Post key={post?._id} post={post} />)}
        </div>
      )}
    </div>
  );
}

export default Explore;
