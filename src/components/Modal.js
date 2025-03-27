import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--white);
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 16px;
  padding: 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ModalHeader = styled.div`
  h2 {
    margin: 0;
  }
`;

const ModalBody = styled.div`
  
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--text-secondary);

  &:hover {
    color: var(--text-primary);
  }
`;

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  showCloseButton = true 
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>{title}</h2>
          {showCloseButton && (
            <CloseButton onClick={onClose}>
              <span className="material-icons">close</span>
            </CloseButton>
          )}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal; 