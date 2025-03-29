import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AnimatedCounter from './AnimatedCounter';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  margin-top: 24px;
`;

const Container = styled.div`
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: baseline;
  width: 340px;
  gap: 12px;
`;

const LoadingText = styled.p`
  margin: 0;
`;

const dotAnimation = keyframes`
  0% { 
    transform: scale(1);
    background: var(--info-light);
  }
  15% { 
    transform: scale(1.75);
    background: var(--info-main);
  }
  30% { 
    transform: scale(1);
    background: var(--info-light);
  }
  100% {
    transform: scale(1);
    background: var(--info-light);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 4px;
  
  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    transform-origin: center bottom;
    
    &:nth-child(1) { animation: ${dotAnimation} 1.2s infinite 0s; }
    &:nth-child(2) { animation: ${dotAnimation} 1.2s infinite 100ms; }
    &:nth-child(3) { animation: ${dotAnimation} 1.2s infinite 200ms; }
  }
`;

const Result = styled.div`
`;

const ResultNumber = styled.h1`
  animation: ${fadeIn} 0.5s ease-out;
  margin: 0 0 16px;
`;

const ResultText = styled.p`
  animation: ${fadeIn} 0.5s ease-out;
  margin: 0;
  color: var(--text-primary);
`;

const CalculationAnimation = ({ votesNeeded, onComplete }) => {
  const [phase, setPhase] = useState(1);
  const [text, setText] = useState('');
  const [showResultText, setShowResultText] = useState(false);
  const messages = [
    'Finding voter data for Chattanooga, TN',
    '7,030 voters found',
    'Analyzing past election turnout rates',
    'Calculating votes needed to win your race',
  ];

  useEffect(() => {
    let currentMessage = 0;
    let currentChar = 0;
    let timer;

    const typeWriter = () => {
      if (currentMessage < messages.length) {
        if (currentChar < messages[currentMessage].length) {
          setText(messages[currentMessage].slice(0, currentChar + 1));
          currentChar++;
        } else {
          if (currentMessage === messages.length - 1) {
            // Last message completed
            setTimeout(() => {
              setPhase(2);
              setTimeout(() => {
                setShowResultText(true);
                setTimeout(() => onComplete?.(), 1500);
              }, 1000);
            }, 1000);
            return;
          }
          currentMessage++;
          currentChar = 0;
          timer = setTimeout(() => {
            setText('');
            typeWriter();
          }, 2000);
          return;
        }
        timer = setTimeout(typeWriter, 20);
      }
    };

    typeWriter();

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (phase === 1) {
    return (
        <LoadingContainer>
          <Dots>
            <span />
            <span />
            <span />
          </Dots>
          <LoadingText>{text}</LoadingText>
        </LoadingContainer>
    );
  }

  return (
    <Container>
      <Result>
        <ResultNumber>
          <AnimatedCounter end={votesNeeded} />
        </ResultNumber>
        {showResultText && (
          <ResultText>Votes needed to win your election</ResultText>
        )}
      </Result>
    </Container>
  );
};

export default CalculationAnimation; 