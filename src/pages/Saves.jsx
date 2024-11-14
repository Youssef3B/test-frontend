import { useEffect, useState } from "react";
import Post from "../components/Post";
import Search from "../components/Search";
import { useSave } from "../contexts/SaveContext";
import { useAuthUser } from "../contexts/AuthContext";
import LoadingPost from "../components/LoadingPost";

function Saves() {
  const { allSaves } = useSave();
  const [filterSaves, setFilterSaves] = useState([]);
  const { user } = useAuthUser();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function getFilterSaves() {
    setIsLoading(true);
    if (allSaves && user) {
      const res = allSaves.filter((save) => save?.user?._id === user?._id);
      console.log(true);
      setFilterSaves(res);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFilterSaves();
  }, [allSaves, user]);

  if (filterSaves) {
    console.log(filterSaves);
  }

  return (
    <div className="my-4 mx-8">
      <Search search={search} setSearch={setSearch} />
      {isLoading ? (
        <LoadingPost />
      ) : (
        <div className="grid xl:grid-cols-2 gap-6 my-4">
          {filterSaves &&
            filterSaves
              .filter((save) => {
                return search === ""
                  ? save
                  : save.post.title
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((save) => <Post key={save?._id} post={save?.post} />)}
        </div>
      )}
      {!isLoading && filterSaves.length === 0 && <NoSaves />}
    </div>
  );
}
function NoSaves() {
  return (
    <h1 className="font-bold text-3xl text-center mx-auto text-gray-900">
      You have no saved posts
    </h1>
  );
}
export default Saves;
