import ModalBtn from '../Buttons/ModalBtn/ModalBtn';
import Logo from '../Logo/Logo';
import './header.style.scss';
import Navigation from './Navigation/Navigation';

export default function Header(){

  return(
    <header className="header">
       <Logo></Logo>
       <Navigation></Navigation>
       <ModalBtn>post</ModalBtn>
    </header>
  )
}