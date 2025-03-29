import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Input from '../components/Input';
import StepIndicator from '../components/StepIndicator';
import Select from '../components/Select';
import RadioButton from '../components/RadioButton';
import CalculationAnimation from '../components/CalculationAnimation';

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

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
  text-align: center;

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 128px;
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
    max-width: 640px;
    background: var(--white);
    border-radius: 16px;
    padding: 48px;
  }
`;

const StepContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};

  h1 {
    margin: 0 0 8px;
    color: var(--text-primary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: ${props => props.single ? 'flex-end' : 'space-between'};
`;

const AffiliationOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const FormContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  margin-top: 24px;
`;

const SignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [office, setOffice] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [officeLevel, setOfficeLevel] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [initialContacts, setInitialContacts] = useState('');
  const [showVoteGoalForm, setShowVoteGoalForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const step = parseInt(hash.replace('#step', ''));
      if (step >= 1 && step <= 5) {
        setCurrentStep(step);
        window.scrollTo(0, 0);
      }
    }
  }, [location]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.zipCode) {
      setZipCode(userData.zipCode);
    }
    if (userData.firstName) {
      setFirstName(userData.firstName);
    }
    if (userData.lastName) {
      setLastName(userData.lastName);
    }
    if (userData.email) {
      setEmail(userData.email);
    }
  }, []);

  const previousStep = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    window.location.hash = `step${prevStep}`;
    window.scrollTo(0, 0);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const nextStep = Math.min(currentStep + 1, 5);
    setCurrentStep(nextStep);
    window.location.hash = `step${nextStep}`;
    window.scrollTo(0, 0);
  };

  const handleComplete = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    localStorage.setItem('userData', JSON.stringify({
      ...userData,
      firstName,
      lastName,
      email,
      password,
      office,
      officeLevel,
      affiliation,
      initialContacts
    }));
    navigate('/dashboard');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!location.hash) {
      window.location.hash = 'step1';
    }
  }, []);

  return (
    <SignupContainer>
      <TopNav variant="signup" />
      <SignupContent>
        <StepIndicator currentStep={currentStep} />
        <div className="form-container">
          {/* Step 1: Office Search */}
          <StepContent active={currentStep === 1}>
            <HeaderContent>
              <h1>Which office are you running for?</h1>
              <p>Make sure it matches your candidacy papers from when you filed for office.</p>
            </HeaderContent>
            <form onSubmit={handleNextStep}>
              <Input
                label="Zip Code"
                id="zipCode"
                type="text"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                placeholder="Enter your zip code"
                style={{ marginBottom: '24px' }}
              />
              <Select
                label="Office Level"
                id="officeLevel"
                value={officeLevel}
                onChange={e => setOfficeLevel(e.target.value)}
                placeholder="Select an office level"
                style={{ marginBottom: '24px' }}
                options={[
                  { value: 'local', label: 'Local Office' },
                  { value: 'state', label: 'State Office' },
                  { value: 'federal', label: 'Federal Office' }
                ]}
              />
              <Input
                label="Office Name"
                type="search"
                placeholder="Search by office name"
                value={office}
                onChange={e => setOffice(e.target.value)}
                style={{ marginBottom: '24px' }}
              />
              <ButtonGroup single>
                <Button type="submit">Next</Button>
              </ButtonGroup>
            </form>
          </StepContent>

          {/* Step 2: Political Affiliation */}
          <StepContent active={currentStep === 2}>
            <HeaderContent>
              <h1>Your campaign's affiliation</h1>
              <p>This is your campaign's affiliation, not how you lean politically or how you are registered to vote. We only support candidates running in nonpartisan races or candidates running as independent or third-party in a partisan election.</p>
            </HeaderContent>
            <form onSubmit={handleNextStep}>
              <AffiliationOptions>
                <RadioButton
                  name="affiliation"
                  value="independent"
                  label="Independent"
                  checked={affiliation === 'independent'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="nonpartisan"
                  label="Nonpartisan"
                  checked={affiliation === 'nonpartisan'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="forward"
                  label="Forward Party"
                  checked={affiliation === 'forward'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="libertarian"
                  label="Libertarian"
                  checked={affiliation === 'libertarian'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="green"
                  label="Green Party"
                  checked={affiliation === 'green'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="republican"
                  label="Republican"
                  checked={affiliation === 'republican'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="democrat"
                  label="Democrat"
                  checked={affiliation === 'democrat'}
                  onChange={e => setAffiliation(e.target.value)}
                />
                <RadioButton
                  name="affiliation"
                  value="other"
                  label="Other"
                  checked={affiliation === 'other'}
                  onChange={e => setAffiliation(e.target.value)}
                />
              </AffiliationOptions>
              <ButtonGroup>
                <Button type="button" variant="neutral" onClick={previousStep}>Back</Button>
                <Button type="submit">Next</Button>
              </ButtonGroup>
            </form>
          </StepContent>

          {/* Step 3: Vote Goal */}
          <StepContent active={currentStep === 3}>
            <CalculationAnimation 
              votesNeeded={1547} 
              onComplete={() => setShowVoteGoalForm(true)} 
            />
            {showVoteGoalForm && (
              <FormContainer>
                <form onSubmit={handleNextStep}>
                  <ButtonGroup>
                    <Button type="button" variant="neutral" onClick={previousStep}>Back</Button>
                    <Button type="submit">Next</Button>
                  </ButtonGroup>
                </form>
              </FormContainer>
            )}
          </StepContent>

          {/* Step 4: Initial Contacts */}
          <StepContent active={currentStep === 4}>
            <HeaderContent>
              <h1>Current Progress</h1>
              <p>How many voter contacts have you made so far?</p>
            </HeaderContent>
            <form onSubmit={handleComplete}>
              <Input
                label="Voters contacted"
                id="contacts"
                type="number"
                value={initialContacts}
                onChange={e => setInitialContacts(parseInt(e.target.value) || 0)}
                placeholder="Enter amount"
                autoFocus
              />
              <ButtonGroup>
                <Button type="button" variant="neutral" onClick={previousStep}>Back</Button>
                <Button type="submit">Complete Setup</Button>
              </ButtonGroup>
            </form>
          </StepContent>
        </div>
      </SignupContent>
    </SignupContainer>
  );
};

export default SignupFlow; 