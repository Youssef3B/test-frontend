function User() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-3">
        <img
          className="h-16 w-16 rounded-full object-cover object-center"
          src="/user.jpg"
          alt=""
        />
        <div>
          <h3 className="font-semibold">Arther Leywin</h3>
          <h4 className="font-semibold text-sm text-gray-600">
            @ArtherLeywin07
          </h4>
        </div>
      </div>
      <div>
        <button className="bg-sky-500 px-6 py-2 rounded-full text-white font-semibold transition-all hover:bg-sky-600">
          Follow
        </button>
      </div>
    </div>
  );
}
export default User;
