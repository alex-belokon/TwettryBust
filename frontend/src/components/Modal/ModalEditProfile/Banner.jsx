import { RxCross1 } from "react-icons/rx";
import { TbCameraPlus } from "react-icons/tb";
import UploadWidget from "../../UploadWidget";
import PropTypes from "prop-types";

export default function Banner({ bannerUrl, setBannerUrl }) {

  return (
    <div className="modalEditProfile__banner">
      {bannerUrl && (
        <img
          className="modalEditProfile__bannerImg"
          src={bannerUrl}
          alt="user banner"
        />
      )}
      <div className="modalEditProfile__bannerBtnWrapper">
        <UploadWidget
          imgUrl={setBannerUrl}
          className="modalEditProfile__bannerAddBtn"
          ariaLabel='add banner to profile'
        >
          <TbCameraPlus className="iconImgStyle" />
        </UploadWidget>
        <button
          type="button"
          className="modalEditProfile__bannerRemoveBtn"
          onClick={() => setBannerUrl(null)}
          aria-label="delete image"
        >
          <RxCross1 className="iconImgStyle" />
        </button>
      </div>
    </div>
  );
}

Banner.propTypes = {
  bannerUrl: PropTypes.string,
  setBannerUrl: PropTypes.func,
};
