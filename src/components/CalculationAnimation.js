import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnimatedCounter from './AnimatedCounter';

const Container = styled.div`
  text-align: center;
  background: var(--bg-default);
  padding: 32px;
  border-radius: 16px;
  margin: 24px 0;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const Dots = styled.span`
  width: 48px;
  text-align: left;
`;

const Result = styled.div`
  h2 {
    font-size: 32px;
    color: var(--primary-blue);
    margin: 0 0 8px;
    display: flex;
    justify-content: center;
    gap: 4px;
  }

  p {
    margin: 0;
    color: var(--dark);
  }
`;

const CalculationAnimation = ({ votesNeeded }) => {
  const [step, setStep] = useState(0);
  const [dots, setDots] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const messages = [
      'Analyzing historical data',
      'Calculating voter turnout',
      'Determining votes needed'
    ];
    
    let currentMessage = 0;
    let currentChar = 0;
    let dotCount = 0;

    const typeWriter = () => {
      if (currentMessage < messages.length) {
        if (currentChar < messages[currentMessage].length) {
          setText(prev => prev + messages[currentMessage][currentChar]);
          currentChar++;
          return true;
        } else {
          currentMessage++;
          currentChar = 0;
          setText('');
          return true;
        }
      }
      return false;
    };

    const updateDots = () => {
      dotCount = (dotCount + 1) % 4;
      setDots('.'.repeat(dotCount));
    };

    const animate = () => {
      if (typeWriter()) {
        updateDots();
        setTimeout(animate, 100);
      } else {
        setStep(1);
      }
    };

    animate();
  }, []);

  if (step === 0) {
    return (
      <Container>
        <LoadingText>
          {text}<Dots>{dots}</Dots>
        </LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <Result>
        <h2>
          <AnimatedCounter end={votesNeeded} />
          <span>votes</span>
        </h2>
        <p>to win your election</p>
      </Result>
    </Container>
  );
};

export default CalculationAnimation; 