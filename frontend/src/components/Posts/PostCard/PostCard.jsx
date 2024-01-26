
// const template = Object.keys(data.books).map(item => <span key={data.books[item].id}>{data.books[item].author} - {data.books[item].name}</span>)

export default function PostCard(props) {
    const PostList = [];

    const {UserID, Content, Date, Attacement, } = props;

    return(
        <>
            <div className="postCard__box">
                <span className="postCard__name">{UserID}</span>
                <b className="postCard__date">{Date}</b>
                <br />
                <p className="postCard__attacement">{Attacement}</p>
                <br />
                <p className="postCard__content">{Content}</p>
            </div>
        </>
    )
}