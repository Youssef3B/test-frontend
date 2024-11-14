import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Return({ user, filterPosts }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center space-x-8 px-6">
      <div onClick={handleBackClick} className="cursor-pointer">
        <IoReturnUpBackOutline size={32} />
      </div>
      <div>
        <h3 className="font-bold text-xl">{user?.userName}</h3>
        <span className="text-gray-600 font-semibold">
          {filterPosts && filterPosts.length} post
        </span>
      </div>
    </div>
  );
}

export default Return;
