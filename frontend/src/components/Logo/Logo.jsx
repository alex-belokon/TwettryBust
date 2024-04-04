import { Link } from "react-router-dom";
import img from '../../assets/logo-removebg-preview.png'
import './logo.style.scss';

export default function Logo(){

  return(
    <Link to="/">
      <img src={img} className='logo' alt="TwettryBust" style={{minHeight: '3.5vw'}}/>
    </Link>
  )
}