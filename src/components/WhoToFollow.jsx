import { useEffect, useState } from "react";
import { useFollower } from "../contexts/FollowerContext";
import User from "./User";
import { useAuthUser } from "../contexts/AuthContext";

function WhoToFollow() {
  const { allFollowers, getAllFollowers, addAFollow } = useFollower();
  const { user } = useAuthUser();
  const [usersNotFollowedByUser, setUsersNotFollowedByUser] = useState([]);

  useEffect(() => {
    getAllFollowers();
  }, []);

  // Filter out users who are already followed by the logged-in user
  async function FilterFollowers() {
    if (allFollowers && user) {
      const usersNotFollowed = allFollowers.filter(
        (follower) => follower.userWhoFollow?._id !== user?._id
      );
      setUsersNotFollowedByUser(usersNotFollowed);
    }
  }

  useEffect(() => {
    FilterFollowers(); // Call FilterFollowers without parameters
  }, [allFollowers, user]); // Add dependencies here

  if (allFollowers) {
    console.log(allFollowers);
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg my-10 h-[360px] ">
      <div className="divide-y divide-gray-400">
        <h2 className="text-xl font-bold mb-2">Who to Follow</h2>
        {usersNotFollowedByUser.map((follower) => (
          <User key={follower._id} follower={follower} />
        ))}
      </div>
    </div>
  );
}

export default WhoToFollow;
