import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import Comment from "./Comment";
import { useComment } from "../contexts/CommentContext";
import { useUser } from "../contexts/UserContext";

function Comments({ id, user }) {
  const [text, setText] = useState("");
  const { CreateComment, allComments, getAllComments, deleteComment } =
    useComment();
  const [commentsFiltred, setCommentsFiltred] = useState([]);

  const [isUserCommented, setIsUserCommented] = useState(false);
  const { user: authUser, getUserFromHisId } = useUser();

  // async function FilterComm() {
  //   const res = allComments.filter((comment) => comment?.user?._id === user?._id);

  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { user: user?._id, post: id, description: text };
    const newComment = await CreateComment(data);
    setText("");

    // Update local state immediately, adding new comment at the beginning
    setCommentsFiltred((prevComments) => [newComment, ...prevComments]);

    // Optionally, refresh all comments
    getAllComments();
  }

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    function filterComments() {
      const filteredComments = allComments
        .filter((comment) => comment?.post?._id === id)
        .reverse(); // Reverse the order of comments
      setCommentsFiltred(filteredComments);
    }

    filterComments();
  }, [allComments, id]);

  useEffect(() => {
    getUserFromHisId(user?._id);
  }, [user?._id]);

  return (
    <div className="my-6">
      <form className="w-full" onSubmit={handleSubmit} action="">
        <h3 className="font-semibold text-lg">Comments</h3>
        <div className="my-2 flex items-center">
          <div>
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={`/uploads/${authUser?.avatar}`}
              alt=""
            />
          </div>
          <div className="xl:w-[600px] w-48">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              placeholder="Type a Comment"
              background="white"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 text-white py-1 px-4 rounded-full font-semibold transition-all hover:bg-sky-600"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Section Of Comments  */}
      {commentsFiltred.map((comment, index) => (
        <Comment
          deleteComment={deleteComment}
          user={user}
          comment={comment}
          key={index}
        />
      ))}
    </div>
  );
}

export default Comments;
