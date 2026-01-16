import React from 'react';
import Styles from '../Styles/authStyles.module.css';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
    return (
        <div className={Styles.stepIndicatorContainer}>
            <p className={Styles.stepText}>Step {Math.floor(currentStep)} Of {totalSteps}</p>
            <div className={Styles.stepDots}>
                {[...Array(totalSteps)].map((_, index) => {
                    const stepNum = index + 1;
                    let dotClass = Styles.stepDot;
                    
                    if (stepNum < Math.floor(currentStep)) {
                        dotClass = `${Styles.stepDot} ${Styles.completedDot}`;
                    } else if (stepNum === Math.floor(currentStep)) {
                        dotClass = `${Styles.stepDot} ${Styles.activeDot}`;
                    }
                    
                    return <div key={index} className={dotClass} />;
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
