import { useTranslation } from "react-i18next";
import './ProfileMedia.scss';

export default function NoPosts ({elemName, children}) {
  const { t } = useTranslation();

  return(
    <div className="noPosts__wrapper">
      <h4 className="noPosts__title">{t('profile.notYet')} {elemName}</h4>
      <p className='noPosts__text'>{children}</p>
    </div>
  )
}