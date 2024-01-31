import "./CreatePost.scss"

export default function CreatePost() {
  return (
    <>
      <div className="createpost-container">
        <div className="createpost-textbox">
          <img src="https://res.cloudinary.com/dfrps0cby/image/upload/v1706088899/yhtmn2doas2cp3nuhtbu.jpg" alt="Icon" className="createpost-icon"/>
          <textarea placeholder="What is happening?!" className="createpost-input"></textarea>
        </div>
      </div>
    </>
  )
}