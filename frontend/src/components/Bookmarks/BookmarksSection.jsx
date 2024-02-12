import { useParams } from "react-router-dom"
import PostList from "../Posts/PostList/PostList";
import { getPosts } from "../../api/posts";
import { useEffect, useState } from "react";
import NotificationListEmpty from "../NotificationList/NotificationListEmpty/NotificationListEmpty";

function getRandom() {
    return Math.random() - 0.5;
}

export default function NotificationList() {
    const [posts, setPosts] = useState(null);////змінити null на [],якщо подив потрібно NotificationEmpty
    const { type } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPosts('forYou');
                setPosts(data.sort(getRandom));//закоментувати цю стрічку,якщо подив потрібно NotificationEmpty
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            }
        };
        fetchData();
    }, [type]);
    const conditionRender = posts && posts.length !== 0
    return <>{conditionRender ? <PostList posts={posts} /> : <NotificationListEmpty type={type} />}</>
}
