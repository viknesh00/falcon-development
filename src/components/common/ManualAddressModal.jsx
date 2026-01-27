import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Styles from './Styles/ManualAddressModal.module.css';
import { LocationIcon } from '../../assets';

const ManualAddressModal = ({ onClose, onSave, initialValues }) => {
  const [formData, setFormData] = useState({
    buildingAddress: initialValues?.buildingAddress || '',
    street: initialValues?.street || '',
    city: initialValues?.city || '',
    postalCode: initialValues?.postalCode || '',
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Using Photon (Komoot) Reverse Geocoding
          // Provides better building/street data and no 403 blocks
          const response = await fetch(
            `https://photon.komoot.io/reverse?lon=${longitude}&lat=${latitude}`
          );
          const data = await response.json();

          if (data && data.features && data.features.length > 0) {
            const p = data.features[0].properties;

            setFormData((prev) => ({
              ...prev,
              buildingAddress: p.housenumber || p.name || '',
              street: p.street || [p.district, p.suburb, p.hamlet].filter(Boolean).join(', ') || '',
              city: [p.city, p.town, p.state, p.county].filter(Boolean).join(', ') || '',
              postalCode: p.postcode || '',
            }));
          } else {
            alert('No address found for this location.');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          alert('Could not detect location. Please enter manually.');
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsLoadingLocation(false);
        alert('Could not retrieve location. Using manual entry.');
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return ReactDOM.createPortal(
    <div className={Styles.overlay}>
      <div className={Styles.modal}>
        <div className={Styles.header}>
          <h2 className={Styles.title}>Enter Address</h2>
          <button className={Styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <button
          className={Styles.locationBtn}
          onClick={handleUseLocation}
          disabled={isLoadingLocation}
        >
          <img src={LocationIcon} alt="" className={Styles.btnIcon} />
          {isLoadingLocation ? 'Detecting Location...' : 'Use Current Location'}
        </button>

        <form onSubmit={handleSubmit}>
          <div className={Styles.formGroup}>
            <label className={Styles.label}>Building / Flat No</label>
            <input
              name="buildingAddress"
              type="text"
              className={Styles.input}
              placeholder="e.g. Flat 4, 123"
              value={formData.buildingAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label className={Styles.label}>Street</label>
            <input
              name="street"
              type="text"
              className={Styles.input}
              placeholder="Checking Street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label className={Styles.label}>City</label>
            <input
              name="city"
              type="text"
              className={Styles.input}
              placeholder="London"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label className={Styles.label}>Postal Code</label>
            <input
              name="postalCode"
              type="text"
              className={Styles.input}
              placeholder="SW1A 1AA"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={Styles.saveBtn}>
            Save Address
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ManualAddressModal;
