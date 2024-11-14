import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaBookmark } from "react-icons/fa";
import { useAuthUser } from "../contexts/AuthContext";
import { useLike } from "../contexts/LikeContext";
import { useSave } from "../contexts/SaveContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../contexts/PostContext";
import { useComment } from "../contexts/CommentContext";

function Post({ post }) {
  const { user } = useAuthUser();
  const { likes, addLike, getAllLikes, deleteLike } = useLike();
  const { allSaves, addSave, deleteSave, getAllSaves } = useSave();
  const { editPost, getAllPosts, deletePost } = usePost();
  const { CreateComment, allComments, getAllComments, deleteComment } =
    useComment();
  const [commentsFiltred, setCommentsFiltred] = useState([]);

  const [filterLikes, setFilterLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [filterSaves, setFilterSaves] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);

  const calculateTimePassed = (createdAt) => {
    if (!createdAt) return "Unknown time"; // Return a default message if createdAt is missing or undefined

    const postDate = new Date(createdAt);
    if (isNaN(postDate)) return "Invalid date"; // Handle invalid date

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
    e.stopPropagation();

    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);

    if (hasLiked) {
      await deleteLike(user?._id, post?._id);
      setIsLiked(false);
    } else {
      const data = { user: user?._id, post: post?._id };
      setIsLiked(true);
      await addLike(data);
    }

    await getAllLikes();
  }

  async function handleSaveToggle(e) {
    e.preventDefault();
    e.stopPropagation();

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
    if (likes) {
      const res = likes.filter((like) => like?.post?._id === post?._id);
      setFilterLikes(res);
    }
  }, [likes, post?._id]);

  useEffect(() => {
    if (allSaves) {
      const res = allSaves.filter((save) => save?.post?._id === post?._id);
      setFilterSaves(res);
    }
  }, [allSaves, post?._id]);

  useEffect(() => {
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);
    setIsLiked(hasLiked);
  }, [filterLikes, user]);

  useEffect(() => {
    const hasSaved = filterSaves.some((save) => save?.user?._id === user?._id);
    setIsSaved(hasSaved);
  }, [filterSaves, user]);

  useEffect(() => {
    function filterComments() {
      const filteredComments = allComments
        .filter((comment) => comment?.post?._id === post?._id)
        .reverse(); // Reverse the order of comments
      setCommentsFiltred(filteredComments);
    }

    filterComments();
  }, [allComments, post?.id]);

  if (post) {
    console.log(post);
  }

  return (
    <div className="my-4 border-2 p-4 rounded-lg">
      <div className="float-right">
        {user?._id === post?.user?._id && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-500 px-3 py-1 rounded-lg text-white"
            >
              E
            </button>
            <button
              onClick={() => setShowModalConfirmation(true)}
              className="bg-red-500 px-3 py-1 rounded-lg text-white"
            >
              D
            </button>
          </div>
        )}
      </div>
      <Link to={`/profile/${post?.user?._id}`}>
        <div className="flex items-center space-x-3">
          <div>
            <img
              className="h-16 w-16 sm:w-12 sm:h-12 rounded-full object-cover object-center"
              src={`/uploads/${post?.user?.avatar}`}
              alt=""
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{post?.user?.fullName}</h3>
              <p className="text-gray-600">
                {calculateTimePassed(post?.createdAt)}
              </p>
            </div>
            <h4 className="text-gray-600 font-medium">
              {post?.user?.userName}
            </h4>
          </div>
        </div>
      </Link>

      <Link to={`/poste/${post?._id}`}>
        <h3 className="my-4 font-bold text-xl">{post?.title}</h3>
        {post?.image && (
          <img
            className="rounded-lg my-4 h-94 w-full object-cover"
            src={`${post?.image}`}
            alt=""
          />
        )}
      </Link>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={handleLikeToggle}>
            <span className="flex items-center space-x-1 cursor-pointer">
              {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              <p>{filterLikes.length}</p>
            </span>
          </button>
          <span className="flex items-center space-x-1 cursor-pointer">
            <FaRegComment size={18} />
            <p>{commentsFiltred.length}</p>
          </span>
        </div>
        <button onClick={handleSaveToggle}>
          <span className="flex items-center space-x-1 cursor-pointer">
            {isSaved ? <FaBookmark size={24} /> : <CiBookmark size={24} />}
          </span>
        </button>
      </div>

      {showModal && (
        <ModalEditPost
          editPost={editPost}
          post={post}
          onClose={() => setShowModal(false)}
          getAllPosts={getAllPosts}
        />
      )}
      {showModalConfirmation && (
        <ModalConfirmation
          deletePost={deletePost}
          onClose={() => setShowModalConfirmation(false)}
          post={post}
          getAllPosts={getAllPosts}
        />
      )}
    </div>
  );
}

function ModalEditPost({ onClose, post, editPost, getAllPosts }) {
  const [imageSrc, setImageSrc] = useState(post?.image);
  const [title, setTitle] = useState(post?.title);

  // Function to handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  // Function to simulate click on the hidden file input
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);

    // Check if a new image file has been selected
    if (document.getElementById("fileInput").files[0]) {
      formData.append("image", document.getElementById("fileInput").files[0]);
    } else {
      // If no new file, use the existing post.image value
      formData.append("image", post.image);
    }

    await editPost(post?._id, formData);
    onClose(true);
    await getAllPosts();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-1 rounded-lg float-right"
        >
          Close
        </button>
        <h2 className="text-lg font-semibold">Edit Post</h2>
        <form onSubmit={HandleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder=""
              required=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {post && post?.image ? (
            <div className="mb-5">
              <img
                onClick={triggerFileInput}
                className="w-full h-60 object-cover rounded-lg cursor-pointer"
                src={imageSrc}
                alt="Post Thumbnail"
              />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
}

function ModalConfirmation({ onClose, deletePost, post, getAllPosts }) {
  async function handleDeletePost(e) {
    e.preventDefault();
    await deletePost(post?._id);
    await getAllPosts();
    onClose();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div>
          <h2 className="text-center my-4 text-xl font-bold">
            Are You Sure You Want Delete This Post ?
          </h2>
          <div className="flex justify-end space-x-2">
            <form onSubmit={handleDeletePost} action="">
              <button className="bg-red-500 px-3 py-1 rounded-lg text-white">
                Delete
              </button>
            </form>

            <button
              onClick={() => onClose()}
              className="bg-yellow-500 px-3 py-1 rounded-lg text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
