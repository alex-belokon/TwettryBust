import PostCard from "./PostCard/PostCard"

import './Posts.scss'

export default function Posts() {
    return(
        <>
        <div className="post-container">
            <div className="post-selector-container">
                <button className="post-selector__btn active">For you</button>
                <button className="post-selector__btn">Following</button>
            </div>

            <div className="post-create-container">
                <div className="post-create-area">
                    <PostCard></PostCard>
                </div>
            </div>
        </div>
        </>
    )
}