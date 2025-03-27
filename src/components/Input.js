import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 400;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Outfit', sans-serif;

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
  }

  &::placeholder {
    color: var(--text-disabled);
  }

  &:focus {
    outline: none;
    border-color: var(--primary-main);
  }
`;

const Input = ({ 
  label, 
  id,
  type = "text",
  ...props 
}) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput 
        type={type}
        id={id}
        {...props}
      />
    </InputContainer>
  );
};

export default Input; 