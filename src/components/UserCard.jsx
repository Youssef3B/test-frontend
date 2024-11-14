import { useEffect, useState } from "react";
import { useAuthUser } from "../contexts/AuthContext";
import { useFollower } from "../contexts/FollowerContext";

function UserCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { addAFollow, allFollowers, deleteFollow } = useFollower();
  const { user: userAuth } = useAuthUser();

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isFollowing) {
      await deleteFollow(userAuth?._id, user?._id);
    } else {
      const data = { userWhoFollow: userAuth?._id, userWhoFollowed: user?._id };
      await addAFollow(data);
    }
    // The state will be updated in the useEffect below when allFollowers changes
  }

  useEffect(() => {
    const hasFollowing = allFollowers.some(
      (follow) =>
        follow?.userWhoFollow?._id === userAuth?._id &&
        follow?.userWhoFollowed?._id === user?._id
    );
    setIsFollowing(hasFollowing);
  }, [allFollowers, userAuth, user]);

  return (
    <div className="border rounded-lg p-6 text-center">
      <img
        className="h-24 w-24 rounded-full object-cover object-center mx-auto"
        src={`/uploads/${user?.avatar}`}
        alt=""
      />
      <h3 className="font-semibold mt-2">{user?.fullName}</h3>
      <p className="text-gray-600 mb-6">{user?.userName}</p>

      {/* Conditionally render the Follow/Unfollow button */}
      {userAuth?._id !== user?._id && (
        <button
          className={`px-5 py-1 text-white rounded-full font-semibold transition-all ${
            isFollowing
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
          onClick={handleSubmit}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}

export default UserCard;
