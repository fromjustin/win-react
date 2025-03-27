import React from 'react';
import styled from 'styled-components';

const RadioContainer = styled.div`
  width: 100%;
`;

const RadioLabel = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  gap: 12px;
  font-size: 16px;
  color: var(--text-primary);
  background: var(--white);

  &:hover {
    background: var(--bg-default);
  }
`;

const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-main);
  border-radius: 50%;
  margin: 0;
  position: relative;

  &:checked {
    border-color: var(--neutral-dark);
    
    &:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: var(--neutral-dark);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const RadioButton = ({ label, ...props }) => {
  return (
    <RadioContainer>
      <RadioLabel>
        <RadioInput type="radio" {...props} />
        {label}
      </RadioLabel>
    </RadioContainer>
  );
};

export default RadioButton; 