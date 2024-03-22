import { useTranslation } from "react-i18next";
import './ProfileMedia.scss';

export default function NoPosts ({elemName, children}) {
  const { t } = useTranslation();

  return(
    <div className="noPosts__wrapper">
      <h3 className="noPosts__title">{t('profile.notYet')} {elemName}</h3>
      <p className='noPosts__text'>{children}</p>
    </div>
  )
}