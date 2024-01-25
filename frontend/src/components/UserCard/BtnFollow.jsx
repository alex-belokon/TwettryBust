import { useState } from "react";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";

export default function BtnFollow({ userLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="userCard__btn"
        aria-label="Following or Unfollow"
        onClick={() => setIsModalOpen(true)}
      ></button>
      {isModalOpen && (
        <ModalFollow
          userName={userLogin}
          closeModal={() => setIsModalOpen(false)}
        ></ModalFollow>
      )}
    </>
  );
}
