import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyles = styled.button`
  font-family: 'Outfit', sans-serif;
  font-size: ${props => props.size === 'small' ? '12px' : '16px'};
  font-weight: 500;
  padding: ${props => props.size === 'small' ? '8px 24px' : '12px 24px'};
  border-radius: 64px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  justify-content: ${props => props.fullWidth ? 'center' : 'flex-start'};

  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background: var(--yellow);
          color: var(--dark);
          &:hover {
            background: #E5AB3A;
          }
        `;
      case 'secondary':
        return css`
          background: var(--primary-dark);
          color: var(--white);
          &:hover {
            background: #080F1D;
          }
        `;
      case 'success':
        return css`
          background: var(--success-disabled);
          color: var(--white);
          
          .material-icons-outlined {
            font-size: 20px;
            color: var(--white);
          }
        `;
      case 'neutral':
      default:
        return css`
          background: var(--bg-default);
          color: var(--text-primary);
          &:hover {
            background: #E5E9EC;
          }
        `;
      case 'clear':
        return css`
          background: transparent;
          border: none;
          color: var(--text-primary);
          padding: 0;
  
          &:hover {
            color: var(--primary-main);
          }
  
          &:disabled {
            color: var(--text-disabled);
          }
        `;
    }
  }}

  &:disabled {
    ${props => props.variant !== 'success' && `
      opacity: 0.5;
      cursor: not-allowed;
    `}
  }
`;

const Button = ({ children, variant = 'primary', size = 'regular', fullWidth = false, ...props }) => {
  return (
    <ButtonStyles variant={variant} size={size} fullWidth={fullWidth} {...props}>
      {children}
    </ButtonStyles>
  );
};

export default Button;