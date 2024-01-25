import ModalWrapper from "../ModalElements/ModalWrapper";


export default function ModalNewMessage({closeModal}){

  return(
    <ModalWrapper closeModal={closeModal}>
      <p className="text">ModalNewMessage</p>
      
    </ModalWrapper>
  )
}