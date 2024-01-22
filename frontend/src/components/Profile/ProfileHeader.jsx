import { IoIosArrowRoundBack } from "react-icons/io";
import './profile.style.scss';
import { useSelector } from "react-redux";

export default function ProfileHeader(){
  const userName = useSelector((state) => state.authUser.user.name + ' ' + state.authUser.user.lastName);

   
  return(
    <div className="profileHeader">
      <IoIosArrowRoundBack size={30}/>
      <div>
        <h2>{userName}</h2>
        <span>0 постів</span>
      </div>
    </div>
  )
}