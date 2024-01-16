import PropTypes from 'prop-types';
import './ModalBtn.style.scss';


export default function ModalBtn({children}){

  return(
    <button className='modalBtn' type="button">{children}</button>
  )
}

ModalBtn.propTypes = {
  children: PropTypes.node.isRequired,
};