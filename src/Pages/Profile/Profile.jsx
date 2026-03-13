import React from 'react';
import { profileConfig } from '../../config/profileConfig';
import styles from './styles/Profile.module.css';
import { EditIcon } from '../../assets';

const Profile = () => {
  const { profile, details } = profileConfig[0];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.profileheader}>
        <h1>Your Profile</h1>

        <button className={styles.editbtn}>
          <img src={EditIcon} alt="Edit" className={styles.editIcon} />
          Edit Profile
        </button>
      </div>

      {/* LEFT PROFILE CARD */}

      <div className={styles.profilelayout}>
        <div className={styles.profilecard}>
          <img src={EditIcon} alt="Edit" className={styles.editProfileIcon} />

          <div className={styles.photocontainer}>
            <div className={styles.photocircle}>Upload a Photo</div>
          </div>

          <h2>{profile.name}</h2>

          <p className={styles.profileemail}>{profile.email}</p>
          <p className={styles.profilephone}>{profile.phone}</p>
        </div>

        {/* RIGHT DETAILS CARD */}
        <div className={styles.detailscard}>
          <div className={styles.detailsgrid}>
            {details.map((item, index) => (
              <div key={index} className={styles.detailitem}>
                <div className={styles.greenline}></div>

                <div>
                  <p className={styles.label}>{item.label}</p>
                  <p className={styles.value}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
