import PostCard from "../../components/Posts/PostCard/PostCard";
import { getGroupLatest } from "../../api/groups";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CommunitiesLatest() {
    const [latest, setLatest] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGroupLatest(id);
               data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
               const latestTwoPosts = data.slice(0, 2);
               setLatest(latestTwoPosts);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            }
        }
        fetchData();
    }, [id])
    return (
        <ul>
            {latest.map((item) => <li key={item.id} > <PostCard postData={item}></PostCard> </li>)}
        </ul>
    )
}
