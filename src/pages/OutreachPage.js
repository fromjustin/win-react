import React from 'react';
import styled from 'styled-components';
import TopNav from '../components/TopNav';
import Button from '../components/Button';

const PageContainer = styled.div`
  background: var(--bg-default);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 32px 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 24px;
  text-align: center;

  h1 {
    font-size: 20px;
    margin: 0 0 8px;
    
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
`;

const UpgradeBar = styled.div`
  background: var(--white);
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  p {
    margin: 0;
    font-size: 14px;
  }

  @media (min-width: 768px) {
    padding: 16px 24px;
    margin-bottom: 32px;

    p {
      font-size: 16px;
    }
  }
`;

const CampaignGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CampaignCard = styled.div`
  background: var(--white);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;

  h3 {
    font-size: 15px;
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }

  .stats {
    color: var(--text-secondary);
    font-size: 13px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    @media (min-width: 768px) {
      font-size: 14px;
      gap: 16px;
    }
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
  }

  .suggested {
    background: var(--primary-light);
    color: var(--primary-dark);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    margin-left: auto;
    white-space: nowrap;

    @media (min-width: 768px) {
      font-size: 12px;
    }
  }
`;

const OutreachPage = () => {
  return (
    <PageContainer>
      <TopNav />
      <MainContent>
      <UpgradeBar>
          <p>Upgrade texting</p>
          <Button variant="primary">Apply</Button>
        </UpgradeBar>

        <Header>
          <h1>Create your first<br></br>outreach campaign</h1>
        </Header>

        <CampaignGrid>
          <CampaignCard>
            <h3>
              Voter issues text message
              <span className="suggested">Suggested</span>
            </h3>
            <p className="stats">
              <span className="stat">5,000 Free</span>
              <span className="stat">|</span>
              <span className="stat">Impact</span>
              <span className="stat">INDEPENDENTS (3)</span>
            </p>
          </CampaignCard>

          <CampaignCard>
            <h3>Text message</h3>
            <p className="stats">
              <span className="stat">5,000 Free</span>
              <span className="stat">|</span>  
              <span className="stat">Impact</span>
            </p>
          </CampaignCard>

          <CampaignCard>
            <h3>Door knocking</h3>
            <p className="stats">
              <span className="stat">Free</span>
              <span className="stat">|</span>
              <span className="stat">Impact</span>
            </p>
          </CampaignCard>

          <CampaignCard>
            <h3>Robocall message</h3>
            <p className="stats">
              <span className="stat">$0.45/mes.</span>
              <span className="stat">|</span>
              <span className="stat">Impact</span>
            </p>
          </CampaignCard>

          <CampaignCard>
            <h3>Social post</h3>
            <p className="stats">
              <span className="stat">Free</span>
              <span className="stat">|</span>
              <span className="stat">Impact</span>
            </p>
          </CampaignCard>
        </CampaignGrid>
      </MainContent>
    </PageContainer>
  );
};

export default OutreachPage; 