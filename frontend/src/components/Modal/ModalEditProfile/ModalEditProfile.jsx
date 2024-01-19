import ModalWrapper from "../ModalElements/ModalWrapper";
import PropTypes from "prop-types";
import './modalEditProfile.style.scss';

export default function ModalEditProfile({ closeModal }) {
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="modalEditProfile__header">
        <h3 className="modalEditProfile__title">Edit profile</h3>
        <button className="modalEditProfile__btnSave">Save</button>
      </div>
    </ModalWrapper>
  );
}

ModalEditProfile.propTypes = {
  closeModal: PropTypes.func,
};
