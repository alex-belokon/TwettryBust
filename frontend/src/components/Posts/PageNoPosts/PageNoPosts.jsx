import { useTranslation } from "react-i18next";
import './PageNoPosts.scss';

export default function PageNoPosts ( ) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="pageNoPosts__title">{t('home.welcome')}</h2>
      <p className='pageNoPosts__text'>{t('home.noFollowing')}</p>
    </div>
  )
}