import { MdDateRange } from "react-icons/md";

function UserInfo({ user, filterFollowers, filterFollowing }) {
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `Joined ${month} ${year}`;
  };

  const dbDate = user?.createdAt;
  const formattedDate = formatJoinDate(dbDate);
  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold">{user?.fullName}</h3>
        <p className="text-gray-600">{user?.userName}</p>
        <p className="font-semibold ">
          {user?.bio === null ? "No Bio" : user?.bio}
        </p>
        <p className="my-2 flex items-center space-x-2">
          <MdDateRange />
          <span className="font-semibold text-gray-600">{formattedDate}</span>
        </p>
        <div className="flex space-x-4">
          <p className="text-gray-500">
            <span className="font-bold text-black">{filterFollowing.length} </span>Following
          </p>
          <p className="text-gray-500">
            <span className="font-bold text-black">{filterFollowers.length} </span>Followers
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
