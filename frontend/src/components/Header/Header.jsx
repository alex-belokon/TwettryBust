import { useEffect, useState } from "react";
import ModalBtn from "../Buttons/ModalBtn/ModalBtn";
import Logo from "../Logo/Logo";
import "./header.style.scss";
import Navigation from "./Navigation/Navigation";
import { SiSparkpost } from "react-icons/si";
import ModalWrapper from "../Modal/ModalElements/ModalWrapper";
import UserData from "./userData/userData";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1310);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1310);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <Logo></Logo>
      <Navigation></Navigation>
      <ModalBtn ariaLabel="Post" btnClick={() => setIsModalOpen(true)}>
        {isWideScreen ? `${t('btn.post')}` : <SiSparkpost size={30} />}
      </ModalBtn>

      {isModalOpen && (
        <ModalWrapper
          isModalPost={true}
          closeModal={() => setIsModalOpen(false)}
        ></ModalWrapper>
      )}
      <UserData></UserData>
    </header>
  );
}
