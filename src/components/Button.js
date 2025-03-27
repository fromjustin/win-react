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
    }
  }}

  &:disabled {
    ${props => props.variant !== 'success' && `
      opacity: 0.5;
      cursor: not-allowed;
    `}
  }
`;

const Button = ({ children, variant = 'primary', size = 'regular', ...props }) => {
  return (
    <ButtonStyles variant={variant} size={size} {...props}>
      {children}
    </ButtonStyles>
  );
};

export default Button;