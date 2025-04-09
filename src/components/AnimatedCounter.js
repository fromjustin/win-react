import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CounterText = styled.span`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  filter: ${props => props.isAnimating ? 'blur(1px)' : 'none'};
  transition: filter 0.2s;
`;

const AnimatedCounter = ({ end }) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let startTimestamp;
    const duration = 600; // 0.6 seconds
    setIsAnimating(true);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = t => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
      }
    };

    window.requestAnimationFrame(step);
  }, [end]);

  return <CounterText isAnimating={isAnimating}>{count.toLocaleString()}</CounterText>;
};

export default AnimatedCounter; 