import PropTypes from 'prop-types';


export default function ModalBtn({children}){

  return(
    <button className='modalBtn' type="button">{children}</button>
  )
}

ModalBtn.propTypes = {
  children: PropTypes.node.isRequired,
};