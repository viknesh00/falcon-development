import React from 'react';
import { loanTrackStatus } from '../../application/config/loanTrackStatus';
import styles from './styles/LoanStatus.module.css';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '../../../../shared/assets';

const LoanStatus = () => {
  const navigate = useNavigate();

  const data = loanTrackStatus[0];

  const getCircleColor = (status) => {
    if (status === 'Completed') return '#1D9B5E';
    if (status === 'In Progress') return '#F7C714';
    return '#D9D9D9';
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.backButtonContainer} onClick={() => navigate(-1)}>
          {/* Using text arrow if icon issues persist, but sticking to requested icon */}
          <img className={styles.backIcon} src={ArrowRightIcon} alt="back" />
          Back
        </div>
      </div>

      <h2 className={styles.title}>Financing Application Status</h2>

      <div className={styles.card}>
        {/* APPLICATION DETAILS */}
        <div className={styles.detailsGrid}>
          {data.applicationDetails.map((item, index) => (
            <div key={index} className={styles.detailItem}>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.value}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* STATUS */}
        <h4 className={styles.statusTitle}>Application Status</h4>

        <div className={styles.timeline}>
          <div className={styles.line}></div>

          {data.applicationStatus.stages.map((stage, index) => (
            <div className={styles.stage} key={index}>
              <div
                className={styles.circle}
                style={{ background: getCircleColor(stage.status) }}
              ></div>

              <p className={styles.stageName}>{stage.stageName}</p>

              {stage.date && <p className={styles.stageDate}>{stage.date}</p>}

              {!stage.date && <p className={styles.stageDate}>{stage.status}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanStatus;
