import { useEffect, useState } from "react";
import Search from "../components/Search";
import UserCard from "../components/UserCard";
import { useUser } from "../contexts/UserContext";
import LoadingUser from "../components/LoadingUser";
import { Link } from "react-router-dom";

function People() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { allUsers, getAllUsers } = useUser();
  useEffect(() => {
    setLoading(true);
    getAllUsers().finally(() => setLoading(false));
  }, []);
  return (
    <div className="my-8 mx-4">
      <Search search={search} setSearch={setSearch} />
      {loading ? (
        <LoadingUser />
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 my-8">
          {allUsers &&
            allUsers
              .filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item.userName.toLocaleLowerCase().includes(search);
              })
              .map((user) => (
                <Link to={`/profile/${user?._id}`} key={user?._id}>
                  <UserCard user={user} />
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
export default People;
