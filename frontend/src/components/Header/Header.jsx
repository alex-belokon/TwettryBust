import { useEffect, useState } from "react";
import ModalBtn from "../Buttons/ModalBtn/ModalBtn";
import Logo from "../Logo/Logo";
import "./header.style.scss";
import Navigation from "./Navigation/Navigation";
import { SiSparkpost } from "react-icons/si";
import UserData from "./UserData/UserData";
import { useTranslation } from "react-i18next";
import ModalPost from "../Modal/ModalPost/ModalPost";

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
      <div className="modalBtnHeader__wrapper">
        <ModalBtn ariaLabel="Post" btnClick={() => setIsModalOpen(true)}>
          {isWideScreen ? `${t("btn.post")}` : <SiSparkpost className="icon_siSparkpost" />}
        </ModalBtn>
      </div>

      {isModalOpen && (
        <ModalPost
          isModalPost={true}
          closeModal={() => setIsModalOpen(false)}
        ></ModalPost>
      )}
      <UserData></UserData>
    </header>
  );
}
