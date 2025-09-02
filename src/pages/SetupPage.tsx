import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Layout, Typography } from 'antd';
import styled from 'styled-components';
import { useGameStore } from '../store/gameStore';
import { defaultStoryContext } from '../contexts';
import GameHeader from '../components/GameHeader';
import GameFooter from '../components/GameFooter';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const SetupContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  text-align: center;
`;

const SetupPage = () => {
  const [context, setContext] = useState(defaultStoryContext.trim());
  const startGame = useGameStore((state) => state.startGame);
  const navigate = useNavigate();

  const handleStart = () => {
    if (context.trim()) {
      startGame(context.trim());
      navigate('/game');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <GameHeader />
      <Content>
        <SetupContainer>
          <Title level={2} style={{ color: '#e0e0e0' }}>Create Your World</Title>
          <Paragraph style={{ color: '#888' }}>
            Define the background, your character, and the starting scene. The AI will bring it to life.
          </Paragraph>
          <Input.TextArea
            rows={15}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            style={{
              background: '#111',
              borderColor: '#333',
              color: '#e0e0e0',
              fontSize: '1rem',
              fontFamily: 'Share Tech Mono, monospace'
            }}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleStart}
            style={{ marginTop: '24px' }}
            ghost
          >
            Start Adventure
          </Button>
        </SetupContainer>
      </Content>
      <GameFooter />
    </Layout>
  );
};

export default SetupPage;
