import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ModalBtn from "../Buttons/ModalBtn/ModalBtn";
import ModalNewMessage from "../Modal/ModalNewMessage/ModalNewMessage";
import { useTranslation } from "react-i18next";
export default function MessagesSection() {
  const [isModalNewMessage, setIsModalNewMessage] = useState(false);
  const { id } = useParams();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
const { t } = useTranslation();
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
            <h2>{t("messages.select")}</h2>
            <p>{t("messages.selectText")}</p>
            <ModalBtn
              ariaLabel="open modal new message"
              btnClick={() => setIsModalNewMessage(true)}
            >
              {t("messages.nweMessage")}
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
