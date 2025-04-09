import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from './Button';

const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  30% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const burstAnimation = keyframes`
  0% {
    transform: translate(0, 0) scale(2);
    opacity: 0;
  }
  20% {
    transform: translate(0, 0) scale(1.5);
    opacity: 1;
  }
  40% {
    transform: translate(var(--tx), var(--ty)) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
`;

const containerAnimation = keyframes`
  0% {
    transform: translate(0%, 0%);
  }
  30% {
    transform: translate(0%, 0%);
  }
  40% {
    transform: translate(0%, 0%);
  }
  60% {
    transform: translate(0%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
`;

const Burst = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: ${props => props.shape === 'circle' ? '50%' : '0'};
  background: var(--primary-dark);
  
  ${props => props.active && css`
    animation: ${burstAnimation} 0.5s ease-out forwards;
    --tx: ${props => Math.cos(props.angle) * 20}px;
    --ty: ${props => Math.sin(props.angle) * 20}px;
  `}
`;

const Star = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary-dark);
  opacity: 0;
  clip-path: polygon(
    50% 0%,    /* top point */
    65% 35%,   /* top right corner */
    100% 50%,  /* right point */
    65% 65%,   /* bottom right corner */
    50% 100%,  /* bottom point */
    35% 65%,   /* bottom left corner */
    0% 50%,    /* left point */
    35% 35%    /* top left corner */
  );
  
  ${props => props.active && css`
    animation: ${starAnimation} .5s ease-out forwards;
  `}
`;

const CheckboxContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TaskItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;

  .task-content {
    display: flex;
    align-items: normal;
    gap: 8px;
  }

  .task-checkbox {
    cursor: pointer;
    color: ${props => props.completed ? 'var(--text-disabled)' : 'var(--primary-dark)'};
    transition: transform 0.2s ease;
    
    &.completed {
      animation: ${checkmarkAnimation} 0.4s ease forwards;
    }

    &:hover {
      color: ${props => props.completed ? 'var(--text-disabled)' : 'var(--primary-dark)'};
      transform: scale(1.1);
    }
  }

  .task-details {
    h3 {
      margin: 0 0 4px;
      font-size: 16px;
      color: ${props => props.completed ? 'var(--text-disabled)' : 'var(--text-primary)'};
    }

    p {
      margin: 0;
      color: ${props => props.completed ? 'var(--text-disabled)' : 'var(--text-secondary)'};
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

const AnimationContainer = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  transform: translate(-100%, -100%);
  pointer-events: none;
  
  ${props => props.active && css`
    animation: ${containerAnimation} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
`;

const starAnimation = keyframes`
  0% {
    transform: translate(0%, 0%) scale(.2);
    opacity: 0;
  }
  40% {
    transform: translate(-60%, -60%) scale(1);
    opacity: 1;
  }
  90% {
    transform: translate(-60%, -60%) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translate(-60%, -60%) scale(0);
    opacity: 0;
  }
`;

const TaskItem = ({ task, onToggle, onSchedule }) => {
  const [burstActive, setBurstActive] = React.useState(false);
  const [initialBurstActive, setInitialBurstActive] = React.useState(false);

  const handleClick = () => {
    if (!task.completed) {
      setInitialBurstActive(true);
      setTimeout(() => {
        setBurstActive(true);
        setInitialBurstActive(false);
      }, 601);
      setTimeout(() => setBurstActive(false), 600);
    }
    onToggle(task.id);
  };

  return (
    <TaskItemContainer completed={task.completed}>
      <div className="task-content">
        <CheckboxContainer>
          <span 
            className={`material-icons-outlined task-checkbox ${task.completed ? 'completed' : ''}`}
            onMouseEnter={(e) => {
              if (!task.completed) {
                e.target.textContent = 'check_circle';
              }
            }}
            onMouseLeave={(e) => {
              if (!task.completed) {
                e.target.textContent = 'circle';
              }
            }}
            onClick={handleClick}
          >
            {task.completed ? 'task_alt' : 'circle'}
          </span>
          <AnimationContainer active={initialBurstActive}>
            {initialBurstActive && (
              <Star
                key="single-burst"
                active={initialBurstActive}
              />
            )}
            {burstActive && (
              <>
                {[...Array(8)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 8;
                  return (
                    <Burst 
                      key={i} 
                      index={i} 
                      angle={angle}
                      active={burstActive}
                      shape={i % 2 === 0 ? 'circle' : 'square'}
                    />
                  );
                })}
              </>
            )}
          </AnimationContainer>
        </CheckboxContainer>
        <div className="task-details">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      </div>
      <Button 
        variant={task.completed ? 'success' : 'primary'}
        disabled={task.completed}
        onClick={() => !task.completed && onSchedule()}
      >
        {task.completed ? (
          <>
            <span className="material-icons-outlined">check</span>
            Schedule
          </>
        ) : 'Schedule'}
      </Button>
    </TaskItemContainer>
  );
};

export default TaskItem; 