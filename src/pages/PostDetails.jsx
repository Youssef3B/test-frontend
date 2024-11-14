import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import { useAuthUser } from "../contexts/AuthContext";
import { useLike } from "../contexts/LikeContext";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

function PostDetails() {
  const { id } = useParams();
  const { post, getPostFromHisId } = usePost();
  const { user } = useAuthUser();
  const [Loading, setLoading] = useState(false);
  // Likes
  const [filterLikes, setFilterLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  // saves
  const [filterSaves, setFilterSaves] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const { likes, addLike, getAllLikes, deleteLike } = useLike();
  const { allSaves, addSave, deleteSave, getAllSaves } = useSave();
  const { CreateComment, allComments, getAllComments, deleteComment } =
    useComment();
  const [commentsFiltred, setCommentsFiltred] = useState([]);

  const calculateTimePassed = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      const day = postDate.getDate().toString().padStart(2, "0");
      const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
      const hours = postDate.getHours().toString().padStart(2, "0");
      const minutes = postDate.getMinutes().toString().padStart(2, "0");
      return `${day}/${month} ${hours}:${minutes}`;
    }
  };

  async function handleLikeToggle(e) {
    e.preventDefault();
    e.stopPropagation(); // Stop the click event from propagating to the Link

    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);

    if (hasLiked) {
      await deleteLike(user?._id, post?._id);
      setIsLiked(false);
    } else {
      const data = { user: user?._id, post: post?._id };
      setIsLiked(true);
      await addLike(data);
    }

    await getAllLikes(); // Re-fetch likes
  }

  async function handleSaveToggle(e) {
    e.preventDefault();
    e.stopPropagation(); // Stop the click event from propagating to the Link

    const hasSaved = filterSaves.some((save) => save?.user?._id === user?._id);
    if (hasSaved) {
      await deleteSave(user?._id, post?._id);
      setIsSaved(false);
    } else {
      const data = { user: user?._id, post: post?._id };
      setIsSaved(true);
      await addSave(data);
    }
    await getAllSaves();
  }

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      await getPostFromHisId(id);
      setLoading(false);
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  async function FilterPosts() {
    if (likes) {
      const res = likes.filter((like) => like?.post?._id === id);
      setFilterLikes(res);
    }
  }
  async function FilterSaves() {
    if (allSaves) {
      const res = allSaves.filter((save) => save?.post._id === id);
      setFilterSaves(res);
    }
  }

  useEffect(() => {
    if (likes) {
      FilterPosts();
    }
  }, [likes, id]);
  useEffect(() => {
    if (allSaves) {
      FilterSaves();
    }
  }, [allSaves, id]);

  useEffect(() => {
    // Check if the current user has already liked the post
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);
    setIsLiked(hasLiked);
  }, [filterLikes, user]);

  useEffect(() => {
    const hasSaved = filterSaves.some((save) => save?.user?._id === user?._id);
    setIsSaved(hasSaved);
  }, [filterSaves, user]);

  if (allSaves) {
    console.log(allSaves);
  }

  useEffect(() => {
    function filterComments() {
      const filteredComments = allComments
        .filter((comment) => comment?.post?._id === id)
        .reverse(); // Reverse the order of comments
      setCommentsFiltred(filteredComments);
    }

    filterComments();
  }, [allComments, id]);

  return (
    <>
      {Loading ? (
        <LoadingPost />
      ) : (
        <section>
          <div>
            <div className="py-4 px-8 border my-8 mx-5">
              <Link to={`/profile/${post?.user?._id}`}>
                <div className="flex items-center space-x-2">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`/uploads/${post?.user?.avatar}`}
                    alt=""
                  />
                  <div>
                    <h3 className="font-semibold">
                      {post?.user?.fullName}
                      <span className="text-md font-light ps-2 text-gray-600">
                        {calculateTimePassed(post?.createdAt)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {" "}
                      {post?.user?.userName}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="my-4">
                <h3 className="font-semibold text-xl">{post?.title}</h3>
                {post?.image && (
                  <img
                    className="my-4 w-full  object-cover rounded-lg"
                    src={post?.image}
                    alt=""
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <form onSubmit={handleLikeToggle}>
                    <button type="submit">
                      <span className="flex items-center space-x-1 cursor-pointer">
                        {isLiked ? (
                          <FaHeart size={20} />
                        ) : (
                          <FaRegHeart size={20} />
                        )}
                        <p>{filterLikes.length}</p>{" "}
                        {/* Display the filtered likes count */}
                      </span>
                    </button>
                  </form>
                  <span className="flex items-center space-x-1 cursor-pointer">
                    <FaRegComment size={18} />
                    <p>{commentsFiltred.length}</p>
                  </span>
                </div>
                <form onSubmit={handleSaveToggle} action="">
                  <button type="submit">
                    <span className="flex items-center space-x-1 cursor-pointer">
                      {isSaved ? (
                        <FaBookmark size={24} />
                      ) : (
                        <CiBookmark size={24} />
                      )}
                    </span>
                  </button>
                </form>
              </div>
              <Comments user={user} id={id} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
import LoadingPost from "../components/LoadingPost";
import { useSave } from "../contexts/SaveContext";
import { useComment } from "../contexts/CommentContext";

export default PostDetails;
