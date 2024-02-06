import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import ModalBtn from "../Buttons/ModalBtn/ModalBtn";
import ModalNewMessage from "../Modal/ModalNewMessage/ModalNewMessage";

export default function MessagesSection() {
  const [isModalNewMessage, setIsModalNewMessage] = useState(false);
  const { id } = useParams();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportWidth > 1030 ? (
    <section className="messagesSection">
      {id ? (
        <Outlet></Outlet>
      ) : (
        <>
          <div className="messagesSection__wrapper">
            <h2>Select a message</h2>
            <p>
              Choose from your existing conversations, start a new one, or just
              keep swimming.
            </p>
            <ModalBtn
              ariaLabel="open modal new message"
              btnClick={() => setIsModalNewMessage(true)}
            >
              New message
            </ModalBtn>
          </div>
          {isModalNewMessage && (
            <ModalNewMessage
              closeModal={() => setIsModalNewMessage(false)}
            ></ModalNewMessage>
          )}
        </>
      )}
    </section>
  ) : (
    viewportWidth < 1030 && id && (
      <section className="messagesSection">
        <Outlet></Outlet>
      </section>
    )
  );
}
