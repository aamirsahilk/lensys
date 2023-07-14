"use client"
import React, {useEffect, useState} from 'react';

import FirstStep from '@/components/ProductAddSteps/FirstStep';
import SecondStep from '@/components/ProductAddSteps/SecondStep';
import ThirdStep from '@/components/ProductAddSteps/ThirdStep';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function AddProductSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const changeStep = (vl) => {
    switch (vl) {
      case 0:
        return (
          <FirstStep />
        )
        break;

      case 1:
        return (
          <SecondStep />
        )
        break;

      case 2:
        return (
          <ThirdStep />
        )
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    setDomLoaded(true)
  },[])
  

  return (
    <main>

          {activeStep === steps.length ? (
            <React.Fragment>
              <div>
                <h1>All Completed</h1>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {
                changeStep(activeStep)
              }
              <div className="step-bt-bar">
                <button className="main-btn big secondary" disabled={activeStep === 0} onClick={handleBack}>
                  <span>Back</span>
                </button>
                <button className="main-btn big dark" onClick={handleNext}>
                  <span>{activeStep === steps.length - 1 ? 'Add To Cart' : 'Continue'}</span>
                </button>
              </div>
            
            </React.Fragment>
          )}

    </main>
  );
}