import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import TopNav from '../components/TopNav';

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
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

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      zipCode,
      password
    }));
    navigate('/signup/steps#step1');
  };

  return (
    <SignupContainer>
      <TopNav variant="marketing" />
      <SignupContent>
        <div className="form-container">
          <HeaderContent>
            <h1>Join GoodParty.org</h1>
            <p>Join the movement of candidates who refuse to accept the status quo and are committed to breaking free from of the two-party system.</p>
            <p>Already have an account? <a href="/#">Log in here</a></p>
          </HeaderContent>
          <form onSubmit={handleSubmit}>
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
            <InputRow>
              <Input
                label="Phone"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
              <Input
                label="Zip Code"
                id="zipCode"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your zip code"
              />
            </InputRow>
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              style={{ marginBottom: '24px' }}
            />
            <Button type="submit" fullWidth>Join</Button>
          </form>
        </div>
      </SignupContent>
    </SignupContainer>
  );
};

export default SignupPage; 