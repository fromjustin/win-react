import React from 'react';
import styled from 'styled-components';
import avatarImage from '../assets/images/avatar.png';
import Logo from './Logo';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  margin-top: 8px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 14px;

  &:hover {
    background: var(--bg-default);
  }

  .material-icons {
    font-size: 20px;
    color: var(--text-secondary);
  }
`;

const Nav = styled.div`
  background: var(--white);
  padding: 12px 32px;
  display: flex;
  flex: 1;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  a {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;

    &:hover {
      color: var(--primary-main);
    }
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AccountMenu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 0px;
  cursor: pointer;

  .material-icons {
    
  }
`;

const TopNav = ({ variant = 'app' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo />
      {variant === 'marketing' ? (
        <>
          <NavLinks>
            <a href="#">For Candidates</a>
            <a href="#">For Voters</a>
            <a href="#">Resources</a>
            <a href="#">Our Mission</a>
          </NavLinks>
          <NavButtons>
            <Button variant="clear" onClick={() => navigate('/signup')}>
              Sign up
            </Button>
            <Button variant="clear" onClick={() => navigate('/#')}>
              Log in
            </Button>
            <Button variant="secondary" onClick={() => navigate('/#')}>
              Get Campaign Tools
            </Button>
          </NavButtons>
        </>
      ) : (
        <AccountMenu onClick={() => setIsOpen(!isOpen)}>
          <span className="material-icons">account_circle</span>
          <span className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</span>
          {isOpen && (
            <DropdownMenu>
              {variant === 'app' && (
                <>
                  <MenuItem>
                    <span className="material-icons">settings</span>
                    Settings
                  </MenuItem>
                  <MenuItem>
                    <span className="material-icons">logout</span>
                    Logout
                  </MenuItem>
                </>
              )}
              {variant === 'signup' && (
                <MenuItem>
                  <span className="material-icons">logout</span>
                  Logout
                </MenuItem>
              )}
            </DropdownMenu>
          )}
        </AccountMenu>
      )}
    </Nav>
  );
};

export default TopNav; 