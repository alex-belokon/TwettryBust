import MessageInput from "../components/Messages/MessageInput/MessageInput";
import SkeletonElement from "./SkeletonElement";

export default function SkeletonMessagesDialog() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "0 20px",
      }}
    >
      <SkeletonElement type='titleShort'></SkeletonElement>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) =>
        index % 2 === 0 ? (
          <SkeletonElement type="messageLeft" key={num}></SkeletonElement>
        ) : (
          <SkeletonElement type="messageRight" key={num}></SkeletonElement>
        )
      )}
      <MessageInput setMarginMessageList="45"></MessageInput>
    </div>
  );
}
