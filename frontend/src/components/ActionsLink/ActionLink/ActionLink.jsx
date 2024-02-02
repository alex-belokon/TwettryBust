import { NavLink, useLocation } from "react-router-dom";
import "./ActionLink.scss";

export default function ActionLink({ text, path }) {
  const location = useLocation ();// {({ isActive }) => isActive && window.location.pathname === link ? 'active' : 'inactive'}
  return (
      <NavLink  className={({ isActive }) => isActive && location.pathname === path ?  'action-selector__btn activeBtn' : 'action-selector__btn'} 
       exact to = {path} 
      >
        {text}
      </NavLink>
    
  );
}