import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  background: ${props => props.theme === 'light' ? 'var(--white)' : 'var(--primary-dark)'};
  padding: 32px 16px 16px 16px;
  margin: ${props => props.theme === 'light' ? '0' : '16px'};
  border-radius: ${props => props.theme === 'light' ? '0' : '8px'};
  display: flex;
  width: fit-content;
  border-right: ${props => props.theme === 'light' ? '1px solid var(--border)' : 'none'};
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 4px;

    a {
      color: ${props => props.theme === 'light' ? 'var(--text-primary)' : 'var(--white)'};
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 10px 12px;
      border-radius: 8px;
      text-decoration: none;
      transition: background-color 0.2s;
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;

      .material-icons {
        color: ${props => props.theme === 'light' ? 'var(--text-primary)' : 'var(--white)'};
      }

      &:hover {
        background: ${props => props.theme === 'light' ? 'var(--bg-default)' : 'rgba(255, 255, 255, 0.1)'};
        color: ${props => props.theme === 'light' ? 'var(--text-primary)' : 'var(--white)'};
        .material-icons {
          color: ${props => props.theme === 'light' ? 'var(--text-primary)' : 'var(--white)'};
        }
      }
    }

    &.active a {
      background: ${props => props.theme === 'light' ? 'var(--bg-default)' : 'rgba(255, 255, 255, 0.1)'};
      color: ${props => props.theme === 'light' ? 'var(--text-primary)' : 'var(--white)'};
      .material-icons {
        color: ${props => props.theme === 'light' ? 'var(--text-primary)' : 'var(--white)'};
      }
    }
  }
`;

const Sidebar = ({ theme = 'light' }) => {
  return (
    <SidebarContainer theme={theme}>
        <ul>
            <li className="active">
            <a href="#"><span className="material-icons">checklist</span>Dashboard</a>
            </li>
            <li>
            <a href="#"><span className="material-icons">auto_awesome</span>AI Assistant</a>
            </li>
            <li>
            <a href="#"><span className="material-icons">folder_shared</span>Voter Data</a>
            </li>
            <li>
            <a href="#"><span className="material-icons">file_open</span>Content Builder</a>
            </li>
            <li>
            <a href="#"><span className="material-icons">account_circle</span>My Profile</a>
            </li>
            <li>
            <a href="#"><span className="material-icons">library_books</span>Free Resources</a>
            </li>
        </ul>
    </SidebarContainer>
  );
};

export default Sidebar; 