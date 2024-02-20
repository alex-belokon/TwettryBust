import './ProfileMedia.scss';

export default function NoPosts ({elemName, children}) {

  return(
    <div className="noPosts__wrapper">
      <h4 className="noPosts__title">У вас ще немає {elemName}</h4>
      <p className='noPosts__text'>{children}</p>
    </div>
  )
}