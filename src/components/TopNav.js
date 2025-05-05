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

const Nav = styled.nav`
  background: var(--white);
  padding: 16px;
  border-bottom: 1px solid var(--border);
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  z-index: 1001;
  
  &:hover {
    color: var(--primary-dark);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--white);
  padding: 16px;
  border-bottom: 1px solid var(--border);
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  button {
    display: block;
    width: 100%;
    padding: 12px 0;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 16px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    
    &:hover {
      color: var(--primary-dark);
    }

    .material-icons {
      margin-right: 12px;
      vertical-align: middle;
      font-size: 20px;
    }
  }

  @media (min-width: 1024px) {
    display: none;  /* Hide the entire nav links container */
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AccountMenu = styled.div`
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    position: relative;
    gap: 0px;
    cursor: pointer;
  }
`;

const TopNav = ({ variant = 'app' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <Nav>
      <NavContent>
        <Logo />
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-icons">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          {variant === 'app' && (
            <>
              <button onClick={() => navigate('/dashboard')}>
                {/*<span className="material-icons">dashboard</span>*/}
                Dashboard
              </button>
              <button onClick={() => navigate('/outreach', { replace: true })}>
                Outreach
              </button>
              <button onClick={() => navigate('/voters')}>
                {/*<span className="material-icons">people</span>*/}
                Voters
              </button>
              <button onClick={() => navigate('/segments')}>
                {/*<span className="material-icons">segment</span>*/}
                Segments
              </button>
              <button onClick={() => navigate('/analytics')}>
                {/*<span className="material-icons">analytics</span>*/}
                Analytics
              </button>
              <button onClick={() => navigate('/website')}>
                {/*<span className="material-icons">language</span>*/}
                Website
              </button>
              <button onClick={() => navigate('/community')}>
                {/*<span className="material-icons">groups</span>*/}
                Community
              </button>
              <button onClick={() => navigate('/resources')}>
                {/*<span className="material-icons">library_books</span>*/}
                Free resources
              </button>
              <button onClick={() => navigate('/settings')}>
                {/*<span className="material-icons">settings</span>*/}
                Settings
              </button>
              <button onClick={handleLogout}>
                {/*<span className="material-icons">logout</span>*/}
                Log out
              </button>
            </>
          )}
        </NavLinks>
        {variant === 'marketing' ? (
          <>
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
                <MenuItem onClick={() => navigate('/settings')}>
                  <span className="material-icons">settings</span>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <span className="material-icons">logout</span>
                  Logout
                </MenuItem>
              </DropdownMenu>
            )}
          </AccountMenu>
        )}
      </NavContent>
    </Nav>
  );
};

export default TopNav;