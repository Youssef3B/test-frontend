import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 transition-all bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-[95%] md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

function Banner({ UpdateUserFromHisId, id, user, getUserFromHisId, authUser }) {
  const [testBanner, setTestBanner] = useState(false);
  const [testAvatar, setTestAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar
      ? `/uploads/${encodeURIComponent(user.avatar.replace(/^\/+/, ""))}`
      : "/default-avatar.png"
  );

  const [bannerPreview, setBannerPreview] = useState(
    user?.banner
      ? `/uploads/${encodeURIComponent(user.banner.replace(/^\/+/, ""))}`
      : "/default-banner.jpg"
  );

  const [fullName, setFullName] = useState(user?.fullName);
  const [userName, setUserName] = useState(user?.userName);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAvatarClick = () => avatarInputRef.current.click();
  const handleBannerClick = () => bannerInputRef.current.click();

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
      setTestAvatar(true);
    }
  };

  const handleBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setBannerPreview(e.target.result);
      reader.readAsDataURL(file);
      setTestBanner(true);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (fullName) formData.append("fullName", fullName);
    if (userName) formData.append("userName", userName);
    if (email) formData.append("email", email);
    if (bio) formData.append("bio", bio);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (bannerFile) formData.append("banner", bannerFile);

    try {
      await UpdateUserFromHisId(id, formData);
      closeModal();
      getUserFromHisId(id);
      toast.success("Your Profile has been updated Successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className="w-full">
      <div
        className="relative w-full h-[200px] sm:h-[300px] md:h-[340px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerPreview})` }}
      >
        <img
          className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 bottom-[-24px] sm:bottom-[-28px] md:bottom-[-36px] left-3 rounded-full object-cover border-2 border-black"
          src={avatarPreview}
          alt=""
        />
      </div>
      {authUser?._id === user?._id ? (
        <button
          onClick={openModal}
          className="float-right my-3 mx-3 border borde-black px-4 py-2 rounded-full font-bold hover:bg-black hover:text-white transition-all"
        >
          Edit Profile
        </button>
      ) : (
        ""
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

          <div className="relative">
            <img
              src={bannerPreview}
              className="w-full h-40 sm:h-52 md:h-96 object-cover cursor-pointer hover:opacity-70"
              alt="banner"
              onClick={handleBannerClick}
            />
            <input
              type="file"
              ref={bannerInputRef}
              className="hidden"
              onChange={handleBannerChange}
              accept="image/*"
            />
            <div className="absolute bottom-[-48px] sm:bottom-[-64px] left-4">
              <img
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-2 border-black cursor-pointer"
                src={avatarPreview}
                onClick={handleAvatarClick}
                alt="avatar"
              />
              <input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="block">
                <label className="block text-lg font-bold" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="my-1 border outline-none border-black rounded-md font-semibold w-full px-3 py-1"
                  type="text"
                  placeholder="Your full name"
                  defaultValue={user?.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="block">
                <label className="block text-lg font-bold" htmlFor="userName">
                  User Name
                </label>
                <input
                  className="my-1 border outline-none border-black rounded-md font-semibold w-full px-3 py-1"
                  type="text"
                  placeholder="Your username"
                  defaultValue={user?.userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="block">
                <label className="block text-lg font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  className="my-1 border outline-none border-black rounded-md font-semibold w-full px-3 py-1"
                  type="email"
                  placeholder="Your email"
                  defaultValue={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <label
              htmlFor="bio"
              className="block my-3 font-medium text-gray-900 text-lg"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              placeholder="Write your bio here..."
              defaultValue={user?.bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <button
              type="submit"
              className="my-4 bg-sky-500 text-white py-2 px-4 rounded-full float-right hover:bg-sky-600 transition-all"
            >
              Update Your Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Banner;
