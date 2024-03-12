import PostCard from "../../components/Posts/PostCard/PostCard";
import { getGroupTop } from "../../api/groups";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function CommunitiesTop() {
    const [top, setTop] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGroupTop(id)
                setTop(data);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            }
        };
        fetchData();
    },[id])
    return (
      // <ul>
      //     {top?.map((item) => <li key={item.id} > <PostCard postData={item}></PostCard> </li>)}
      // </ul>
      <ul>
        {/* {Object.keys(top).length > 0 ? (
          top.map((item) => (
            <li key={item.id}>
              <PostCard postData={item} />
            </li>
          ))
        ) : ( */}
          <li>Поки що порожньо</li>
            {/* // ) */}
            {/* } */}
      </ul>
    );
}

