import img from '../../../assets/verify.png';
import './NotificationListEmpty.scss'

export default function NotificationListEmpty ({type}) { 
    const isVerify = type === 'verified'
    const getTextContent = () => {
        switch (type) {
            case 'verified': return <p className='notification-empty__text'>Likes, mentions, reposts, and a whole lot more — when it comes from a verified account, you’ll find it here. <a href="#">Learn more</a></p>
            case 'mentions': return <p className='notification-empty__text'>When someone mentions you, you’ll find it here.</p>
            default: return <p className='notification-empty__text'>When someone notification you, you’ll find it here.</p>
        }
    } 
    return <div className='notification-empty__content'>{isVerify && <img src={img} alt="" />}<h2 className='notification-empty__title'>Nothing to see here — yet</h2>{getTextContent()}</div>
}
