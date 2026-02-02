import React, { useState, useEffect, useRef } from 'react';
import Styles from './Styles/inputStyles.module.css';
import LookupStyles from './Styles/AddressLookup.module.css';
import { SearchIcon } from '../../assets';

// Free Open API for Postcode Validation & Address Lookup
// Using postcodes.io for validation and Nominatim (OSM) for address details

const validatePostcode = async (postcode) => {
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
    const data = await response.json();
    return data.result; // true or false
  } catch (error) {
    console.error('Postcode validation error:', error);
    return false;
  }
};

const fetchAddresses = async (term) => {
  try {
    // Using Photon (Komoot) - Free, OpenStreetMap-based, reliable, no 403s usually
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(term)}&limit=10&lang=en`
    );
    const data = await response.json();

    if (!data || !data.features) return [];

    return data.features
      .map((feature) => {
        const p = feature.properties;

        // Construct clean address parts
        const buildingName = p.name || '';
        const workingStreet = p.street || '';
        const houseNumber = p.housenumber || '';

        // Combine house number and street if both exist
        const streetAddress = houseNumber
          ? `${houseNumber} ${workingStreet}`.trim()
          : workingStreet;

        return {
          buildingAddress: buildingName,
          street: streetAddress,
          city: p.city || p.town || p.state || '',
          postalCode: p.postcode || '',
          country: p.country || 'UK', // Default to UK if missing, or empty
          // Keep raw for display if needed
          displayName: [buildingName, streetAddress, p.city || p.town, p.postcode, p.country]
            .filter(Boolean)
            .join(', '),
        };
      })
      .filter((addr) => addr.postalCode); // Filter out results without postcodes
  } catch (error) {
    console.error('Address fetch error:', error);
    return [];
  }
};

const AddressLookup = ({ onAddressSelect, onManualEntry, error, touched, value, disabled }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Effect to handle external value changes (e.g. from Postal Code input)
  useEffect(() => {
    // Only update if value is different and valid
    if (typeof value === 'string' && value !== searchTerm) {
      setSearchTerm(value);

      if (value.length >= 3 && !disabled) {
        setIsOpen(true);
        setIsLoading(true);

        const timer = setTimeout(async () => {
          const foundAddresses = await fetchAddresses(value);
          setResults(foundAddresses);
          setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [value, disabled]);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Only search if term length is sufficient for a UK postcode (min 5 chars generally)
    if (term.length < 5) {
      setResults([]);
      return;
    }

    setIsOpen(true);
    setIsLoading(true);
    setIsValidating(true);

    // Debounce could be added here, but for simplicity we rely on the user typing speed or basic timeout
    // Using a small timeout to avoid hitting API on every keystroke if typing fast
    setTimeout(async () => {
      // 1. Fetch Addresses (searches postcodes AND names via Photon)
      const foundAddresses = await fetchAddresses(term);

      setResults(foundAddresses);
      setIsValidating(false);
      setIsLoading(false);
    }, 800);
  };

  const handleSelect = async (addr) => {
    setSearchTerm(addr.postalCode);
    setIsOpen(false);

    // If the selected address is incomplete (e.g. from autocomplete), try to fetch details
    if (!addr.street && !addr.city) {
      setIsLoading(true);
      const detailedResults = await fetchAddresses(addr.postalCode);
      setIsLoading(false);

      if (detailedResults && detailedResults.length > 0) {
        onAddressSelect(detailedResults[0]);
      } else {
        // Fallback to what we have
        onAddressSelect(addr);
      }
    } else {
      onAddressSelect(addr);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsLoading(false);
      onManualEntry(searchTerm);
      return;
    }

    setIsLoading(true);
    setIsOpen(false); // Close dropdown while loading
    setSearchTerm('Fetching location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            const formattedAddress = {
              buildingAddress: addr.house_number || addr.building || '',
              street: addr.road || addr.pedestrian || '',
              city: addr.city || addr.town || addr.village || addr.state_district || '',
              postalCode: addr.postcode || '',
              country: addr.country || '',
            };

            // Format for display
            const displayName = [
              formattedAddress.buildingAddress,
              formattedAddress.street,
              formattedAddress.city,
              formattedAddress.postalCode,
              formattedAddress.country,
            ]
              .filter(Boolean)
              .join(', ');

            setSearchTerm(formattedAddress.postalCode || displayName); // Set search term to postcode if available
            onAddressSelect(formattedAddress);
          } else {
            // No address found for location
            onManualEntry(searchTerm);
          }
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          onManualEntry(searchTerm);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsLoading(false);
        setSearchTerm(value || ''); // Reset search term
        onManualEntry(searchTerm);
        // Optional: Show error alert based on error.code
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className={Styles.inputWrapper} ref={wrapperRef}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: disabled ? 0.6 : 1,
          backgroundColor: disabled ? '#f5f5f5' : 'transparent',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        className={`${Styles.inputContainer} ${error && touched ? Styles.errorBorder : ''}`}
      >
        <div className={Styles.iconWrapper}>
          <img src={SearchIcon} alt="" className={Styles.icon} />
        </div>
        <input
          type="text"
          className={Styles.input}
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => !disabled && setIsOpen(true)}
          disabled={disabled}
        />
      </div>
      {error && touched && <div className={Styles.errorMessage}>{error}</div>}

      {isOpen && searchTerm.length > 0 && (
        <div className={LookupStyles.dropdown}>
          {isLoading ? (
            <div className={LookupStyles.loading}>
              {isValidating ? 'Validating Postcode...' : 'Searching Addresses...'}
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                results.map((addr, idx) => (
                  <div key={idx} className={LookupStyles.option} onClick={() => handleSelect(addr)}>
                    {[addr.buildingAddress, addr.street, addr.city, addr.postalCode]
                      .filter(Boolean)
                      .join(', ')}
                  </div>
                ))
              ) : (
                <div className={LookupStyles.loading}>
                  {searchTerm.length > 4 ? 'No addresses found' : 'Enter a full postcode'}
                </div>
              )}
              <div
                className={`${LookupStyles.option} ${LookupStyles.manualOption}`}
                onClick={() => {
                  handleUseCurrentLocation();
                }}
              >
                Is your address not listed? Use Current Location or Enter manually
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressLookup;
