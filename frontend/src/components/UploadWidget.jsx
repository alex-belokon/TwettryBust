import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function UploadWidget({ children, imgUrl, className }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dfrps0cby",
        uploadPreset: "xisyu95f",
      },
      function (error, result) {
        // console.log("result", result);
        if (!result.info.source && result.info.files) {
          imgUrl(result.info.files[0].uploadInfo.url);
        }
      }
    );
  }, [imgUrl]);

  return (
    <button
      className={className}
      type="button"
      onClick={() => widgetRef.current.open()}
    >
      {children}
    </button>
  );
}

UploadWidget.propTypes = {
  children: PropTypes.node,
  imgUrl: PropTypes.func,
  className: PropTypes.string,
};
