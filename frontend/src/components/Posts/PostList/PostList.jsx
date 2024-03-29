import PostCard from "../PostCard/PostCard";

export default function PostList ({posts}) {
    return <div className="post-create-container">
        {posts.map((postData) => (
            <PostCard postData={postData} key={postData.id} />
          ))}
    </div>
}