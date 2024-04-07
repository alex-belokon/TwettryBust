import PropTypes from "prop-types";
import { TbCameraPlus } from "react-icons/tb";
import UploadWidget from "../../UploadWidget";

export default function Screensaver({ userScreensaver, setScreensaverUrl, userName }) {

  return (
    <div className="modalEditProfile__screensaver">
      {userScreensaver ? (
        <img
          className="modalEditProfile__screensaverImg"
          src={userScreensaver}
          alt={userName + " photo"}
        />
      ) : (
        <span>{`${userName}`.split("")[0]}</span>
      )}
      <UploadWidget
        imgUrl={setScreensaverUrl}
        className="modalEditProfile__screensaverAddBtn"
        ariaLabel='add photo to profile'
      >
        <TbCameraPlus className="iconImgStyle" />
      </UploadWidget>
    </div>
  );
}

Screensaver.propTypes = {
  userScreensaver: PropTypes.string,
  userName: PropTypes.string,
  setScreensaverUrl: PropTypes.func,
};
