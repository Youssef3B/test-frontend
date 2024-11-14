import Post from "./Post";

function Posts({posts}) {
  return (
    <div className="py-4 ">
      {posts.length<= 0 ? <h1 className="text-2xl text-center my-10 font-semibold">No posts available. Try following users to see their posts.</h1> :posts.map((post) => (
        <Post key={post._id} post={post} />
        )) 
      }
  
    </div>
  );
}
export default Posts;
