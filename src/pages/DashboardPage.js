import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import TopNav from '../components/TopNav';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Input from '../components/Input';

const AppContainer = styled.div`
  background: var(--bg-default);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 32px;
  margin: 32px 24px 128px 24px;
`;

const Header = styled.header`

  h1 {
    font-size: 32px;
    margin: 0 0 8px;
  }

  h4 {
    margin: 0 0 8px;
    font-weight: normal;
    color: var(--gray);

    strong {
      color: var(--dark);
    }

    .tasks-link {
      color: var(--text-link);
      text-decoration: none;
    }
  }
`;

const ProgressSection = styled.section`
  background: var(--white);
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  h2 {
    margin: 0;
  }
`;

const ProgressBar = styled.div`
  height: 16px;
  background: var(--bg-default);
  border-radius: 32px;
  overflow: hidden;
  margin-bottom: 8px;
  .progress {
    height: 100%;
    border-radius: 32px;
    background: var(--primary-dark);
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  span {
    color: var(--text-primary);
  }
  .info-icon {
    vertical-align: middle;
    margin-left: 4px;
    font-size: 16px;
  }
`;

const TasksSection = styled.section`
  background: var(--white);
  padding: 24px;
  border-radius: 16px;
`;

const TasksHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .election-day {
    color: var(--gray);
    font-size: 14px;
    line-height: 20px;
    margin: 0;
  }
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TaskItem = styled.div`
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

    &:hover {
      color: ${props => props.completed ? 'var(--text-disabled)' : 'var(--primary-dark)'};
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

const DashboardPage = () => {
  const [votersContacted, setVotersContacted] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [scheduleModalOpen, setScheduleModalOpen] = React.useState(false);
  const [contactsModalOpen, setContactsModalOpen] = React.useState(false);
  const [newContacts, setNewContacts] = React.useState('');
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      title: 'Schedule your persuasive text message',
      description: 'Build trust and persuade voters.',
      completed: false
    }
    // Add more tasks here
  ]);
  const votersNeeded = 1547;
  const progress = Math.min((votersContacted / votersNeeded) * 100, 100);

  const toggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task.completed) {
      setContactsModalOpen(true);
    }
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddContacts = () => {
    const contacts = parseInt(newContacts) || 0;
    setVotersContacted(prev => prev + contacts);
    setNewContacts('');
    setContactsModalOpen(false);
  };

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.initialContacts) {
      setVotersContacted(userData.initialContacts);
    }
    if (userData.firstName) {
      setFirstName(userData.firstName);
    }
  }, []);

  return (
    <AppContainer>
      <TopNav />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Header>
            <h1>{firstName ? `2 weeks away, ${firstName}!` : '2 weeks away!'}</h1>
            <h4 className="stats">
              Your actions so far have earned you <strong>{votersContacted} voter contacts</strong> out of <strong>{votersNeeded} needed to win</strong>.
            </h4>
            <h4>You have <a href="#tasks-section" className="tasks-link">6 tasks</a> you need to complete.</h4>
          </Header>

          <ProgressSection>
            <ProgressHeader>
              <h2>Campaign progress</h2>
              <Button 
                variant="neutral" 
                size="small"
                onClick={() => setContactsModalOpen(true)}
              >
                Record voter contacts
              </Button>
            </ProgressHeader>
            <ProgressBar progress={progress}>
              <div className="progress" />
            </ProgressBar>
            <ProgressStats>
              <span>{votersContacted} voters contacted</span>
              <span>
                {votersNeeded} voter contacts needed
                <span className="material-icons info-icon">info_outline</span>
              </span>
            </ProgressStats>
          </ProgressSection>

          <TasksSection id="tasks-section">
            <TasksHeader>
              <h2>Tasks for this week</h2>
              <p className="election-day">Election Day: April 1, 2025</p>
            </TasksHeader>
            <TasksList>
              {tasks.map(task => (
                <TaskItem key={task.id} completed={task.completed}>
                  <div className="task-content">
                    <span 
                      className="material-icons-outlined task-checkbox"
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
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.completed ? 'task_alt' : 'circle'}
                    </span>
                    <div className="task-details">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={task.completed ? 'success' : 'primary'}
                    disabled={task.completed}
                    onClick={() => !task.completed && setScheduleModalOpen(true)}
                  >
                    {task.completed ? (
                      <>
                        <span className="material-icons-outlined">check</span>
                        Schedule
                      </>
                    ) : 'Schedule'}
                  </Button>
                </TaskItem>
              ))}
            </TasksList>
          </TasksSection>
        </MainContent>
      </ContentWrapper>

      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule text message"
        footer={
          <Button onClick={() => {
            // Handle scheduling
            setScheduleModalOpen(false);
          }}>
            Save
          </Button>
        }
      >
        <p>Modal content goes here...</p>
      </Modal>

      <Modal
        isOpen={contactsModalOpen}
        onClose={() => setContactsModalOpen(false)}
        title="How many voters did you contact?"
        footer={
          <Button onClick={handleAddContacts}>
            Save
          </Button>
        }
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddContacts();
        }}>
          <Input
            id="voter-contacts"
            label="Voters contacted"
            type="number"
            value={newContacts}
            onChange={(e) => setNewContacts(e.target.value)}
            placeholder="Enter amount"
            autoFocus
          />
          <button type="submit" style={{ display: 'none' }} />
        </form>
      </Modal>
    </AppContainer>
  );
};

export default DashboardPage; 