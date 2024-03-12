import { useTranslation } from "react-i18next";
import './BtnFollowToggle.scss';

export default function BtnFollowToggle({btnName=false, toggleFollowClick}) {
  const { t } = useTranslation();

  return (
    <button className="btnStyle" onClick={toggleFollowClick} > 
      {!btnName ? t(`${'btn.follow'}`) : t(`${'btn.unsubscribe'}`)}
    </button>
  );
}
