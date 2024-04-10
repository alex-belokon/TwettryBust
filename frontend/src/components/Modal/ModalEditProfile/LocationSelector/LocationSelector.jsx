import { connect } from "formik";
import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useTranslation } from "react-i18next";
import "./LocationSelector.scss";

const LocationSelector = ({ formik: { setFieldValue }, initialValues }) => {
  const [country, setCountry] = useState(initialValues.country || '');
  const [region, setRegion] = useState(initialValues.region || '');
  const { t } = useTranslation();

  const handleCountryChange = (value) => {
    setCountry(value);
    setFieldValue("country", value);
  };

  const handleRegionChange = (value) => {
    setRegion(value);
    setFieldValue("region", value);
  };

  return (
    <div className="locationSelector__wrapper">
      <div className="locationField__wrapper">
        <label htmlFor="country" className="locationLabel">
        Country
        </label>
        <CountryDropdown
          style={{backgroundColor: 'var(--backgroundColor)'}}
          value={country}
          onChange={handleCountryChange}
          className="locationSelector__fieldStyle"
          id="country"
        />
      </div>

      <div className="locationField__wrapper">
        <label htmlFor="region" className="locationLabel">
          Region
        </label>
        <RegionDropdown
          style={{backgroundColor: 'var(--backgroundColor)'}}
          country={country}
          value={region}
          onChange={handleRegionChange}
          className="locationSelector__fieldStyle"
          id="region"
        />
      </div>
    </div>
  );
};

export default connect(LocationSelector);
