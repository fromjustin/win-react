import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CounterText = styled.span`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const counterRef = useRef(null);
  const startTime = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const counter = counterRef.current;
    const startValue = 0;
    const endValue = end;

    const easeOutQuad = t => t * (2 - t);

    const updateCounter = timestamp => {
      if (!startTime.current) startTime.current = timestamp;
      
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
      
      if (counter) {
        counter.textContent = currentValue.toLocaleString();
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCounter);
      }
    };

    frameRef.current = requestAnimationFrame(updateCounter);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return <CounterText ref={counterRef}>0</CounterText>;
};

export default AnimatedCounter; 