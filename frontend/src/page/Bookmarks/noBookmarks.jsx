import { useTranslation } from "react-i18next";
import './bookmarks.style.scss';

export default function NoBookmarks ({elemName}) {
  const { t } = useTranslation();

  return(
    <div className="noBookmarks__wrapper">
      <h4 className="noBookmarks__title">{t('bookmarks.noBookmarksTitle')} {elemName}</h4>
      <p className='noBookmarks__text'>{t('bookmarks.noBookmarksText')}</p>
    </div>
  )
}