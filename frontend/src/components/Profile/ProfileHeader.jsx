import { IoIosArrowRoundBack } from "react-icons/io";
import './profile.style.scss';

export default function ProfileHeader(){

  return(
    <div className="profileHeader">
      <IoIosArrowRoundBack size={30}/>
      <div>
        <h2>User Name</h2>
        <span>0 постів</span>
      </div>
    </div>
  )
}