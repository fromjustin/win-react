import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Input from '../components/Input';
import StepIndicator from '../components/StepIndicator';

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SignupContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 24px;

  .form-container {
    width: 100%;
    max-width: 480px;
    background: var(--white);
    border-radius: 16px;
    padding: 48px;
  }
`;

const StepContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};

  h1 {
    font-size: 24px;
    margin: 0 0 8px;
    color: var(--dark);
  }

  p {
    font-size: 16px;
    color: var(--gray);
    margin: 0 0 32px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;

  button {
    flex: 1;
  }
`;

const AffiliationOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const VoteGoal = styled.div`
  text-align: center;
  background: var(--bg-default);
  padding: 32px;
  border-radius: 16px;
  margin: 24px 0;

  h2 {
    font-size: 32px;
    color: var(--primary-blue);
    margin: 0 0 8px;
  }

  p {
    margin: 0;
    color: var(--dark);
  }
`;

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [office, setOffice] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [initialContacts, setInitialContacts] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const step = parseInt(hash.replace('#step', ''));
      if (step >= 1 && step <= 5) {
        setCurrentStep(step);
      }
    }
  }, [location]);

  const previousStep = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    window.location.hash = `step${prevStep}`;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const nextStep = Math.min(currentStep + 1, 5);
    setCurrentStep(nextStep);
    window.location.hash = `step${nextStep}`;
  };

  const handleComplete = () => {
    localStorage.setItem('userData', JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      office,
      affiliation,
      initialContacts
    }));
    navigate('/dashboard');
  };

  useEffect(() => {
    if (!location.hash) {
      window.location.hash = 'step1';
    }
  }, []);

  return (
    <SignupContainer>
      <TopNav simplified={true} />
      <SignupContent>
        <StepIndicator currentStep={currentStep} />
        <div className="form-container">
          {/* Step 1: Basic Info */}
          <StepContent active={currentStep === 1}>
            <h1>Create your account</h1>
            <p>Let's get started with your campaign</p>
            <form onSubmit={handleNextStep}>
              <Input
                label="First name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                style={{ marginBottom: '16px' }}
              />
              <Input
                label="Last name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                style={{ marginBottom: '16px' }}
              />
              <Input
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ marginBottom: '16px' }}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                style={{ marginBottom: '24px' }}
              />
              <Button type="submit">Next</Button>
            </form>
          </StepContent>

          {/* Step 2: Office Search */}
          <StepContent active={currentStep === 2}>
            <h1>What office are you running for?</h1>
            <p>Search for your office</p>
            <Input
              type="search"
              placeholder="Search offices..."
              value={office}
              onChange={e => setOffice(e.target.value)}
              style={{ marginBottom: '24px' }}
            />
            <ButtonGroup>
              <Button variant="outline" onClick={previousStep}>Back</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </ButtonGroup>
          </StepContent>

          {/* Step 3: Political Affiliation */}
          <StepContent active={currentStep === 3}>
            <h1>Your Political Affiliation</h1>
            <p>Select your party affiliation</p>
            <AffiliationOptions>
              <Button 
                variant="outline" 
                onClick={() => setAffiliation('Democrat')}
              >
                Democrat
              </Button>
              <Button 
                variant="outline"
                onClick={() => setAffiliation('Republican')}
              >
                Republican
              </Button>
              <Button 
                variant="outline"
                onClick={() => setAffiliation('Independent')}
              >
                Independent
              </Button>
              <Button 
                variant="outline"
                onClick={() => setAffiliation('Other')}
              >
                Other
              </Button>
            </AffiliationOptions>
            <ButtonGroup>
              <Button variant="outline" onClick={previousStep}>Back</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </ButtonGroup>
          </StepContent>

          {/* Step 4: Vote Goal */}
          <StepContent active={currentStep === 4}>
            <h1>Your Path to Victory</h1>
            <p>Based on historical data, you need:</p>
            <VoteGoal>
              <h2>1,547 votes</h2>
              <p>to win your election</p>
            </VoteGoal>
            <ButtonGroup>
              <Button variant="outline" onClick={previousStep}>Back</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </ButtonGroup>
          </StepContent>

          {/* Step 5: Initial Contacts */}
          <StepContent active={currentStep === 5}>
            <h1>Current Progress</h1>
            <p>How many voter contacts have you made so far?</p>
            <Input
              label="Voter Contacts"
              id="contacts"
              type="number"
              placeholder="Enter amount"
              value={initialContacts}
              onChange={e => setInitialContacts(parseInt(e.target.value) || 0)}
              style={{ marginBottom: '24px' }}
            />
            <ButtonGroup>
              <Button variant="outline" onClick={previousStep}>Back</Button>
              <Button onClick={handleComplete}>Complete Setup</Button>
            </ButtonGroup>
          </StepContent>
        </div>
      </SignupContent>
    </SignupContainer>
  );
};

export default SignupPage; 