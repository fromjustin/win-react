import React from 'react';
import styled from 'styled-components';
import avatarImage from '../assets/images/avatar.png';
import Logo from './Logo';

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
  padding: 12px 32px;
  display: flex;
  flex: 1;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
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

const TopNav = ({ simplified = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Nav>
      <Logo />
      <AccountMenu onClick={() => setIsOpen(!isOpen)}>
        <span className="material-icons">account_circle</span>
        <span className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</span>
        {isOpen && (
          <DropdownMenu>
            {!simplified && (
              <MenuItem>
                <span className="material-icons">settings</span>
                Settings
              </MenuItem>
            )}
            <MenuItem>
              <span className="material-icons">logout</span>
              Logout
            </MenuItem>
          </DropdownMenu>
        )}
      </AccountMenu>
    </Nav>
  );
};

export default TopNav; 