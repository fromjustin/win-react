import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 400;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Outfit', sans-serif;
  background: var(--white);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23879099'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 24px;

  &:focus {
    outline: none;
    border-color: var(--primary-main);
  }

  &::placeholder {
    color: var(--text-disabled);
  }
`;

const Select = ({ 
  label, 
  id,
  options = [],
  placeholder,
  ...props 
}) => {
  return (
    <SelectContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledSelect id={id} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default Select; 