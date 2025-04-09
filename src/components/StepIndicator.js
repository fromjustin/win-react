import React from 'react';
import styled from 'styled-components';

const StepIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const Step = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.active || props.completed ? 'var(--neutral-dark)' : 'var(--neutral-main)'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  return (
    <StepIndicators>
      {[...Array(totalSteps)].map((_, index) => (
        <Step 
          key={index + 1}
          active={index + 1 === currentStep}
          completed={index + 1 < currentStep}
        />
      ))}
    </StepIndicators>
  );
};

export default StepIndicator; 