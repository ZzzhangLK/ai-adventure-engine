import { useEffect, useRef } from 'react';
import { Layout, Spin, Alert, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import styled from 'styled-components';
import StoryBlock from '../components/StoryBlock';
import ChoiceButton from '../components/ChoiceButton';
import GameHeader from '../components/GameHeader';
import GameFooter from '../components/GameFooter';

const { Content } = Layout;

const StyledGameWindow = styled.div`
  background: #0a0a0a;
  border: 1px solid #333;
  padding: 24px;
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  color: #e0e0e0;
  overflow-y: auto;
  height: calc(100vh - 200px);

  @media (max-width: 768px) {
    padding: 16px;
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
    height: calc(100vh - 120px);
  }
`;

const ContentWrapper = styled(Content)`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TopControls = styled.div`
  max-width: 800px;
  margin: 0 auto 10px auto;
  text-align: right;
`;

const GamePage = () => {
  const store = useGameStore();
  const navigate = useNavigate();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const userHasScrolledUp = useRef(false);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10;
      userHasScrolledUp.current = !atBottom;
    }
  };

  useEffect(() => {
    if (!userHasScrolledUp.current) {
      anchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [store.history[store.history.length - 1]?.story]);

  // 如果没有故事背景，说明游戏未开始，重定向到设置页
  useEffect(() => {
    if (!store.storyContext) {
      navigate('/');
    }
  }, [store.storyContext, navigate]);

  const handleReset = () => {
    store.resetGame();
    navigate('/');
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <GameHeader />
      <ContentWrapper>
        <TopControls>
          <Button onClick={handleReset}>New Story</Button>
        </TopControls>
        <StyledGameWindow ref={scrollContainerRef} onScroll={handleScroll}>
          {store.history.map((turn, index) => {
            const isLastTurn = index === store.history.length - 1;
            return (
              <div key={turn.id}>
                <StoryBlock text={turn.story} />
                {turn.choices.length > 0 && (
                  <ChoicesContainer>
                    {turn.choices.map((choice) => (
                      <ChoiceButton
                        key={choice}
                        text={choice}
                        onClick={() => store.makeChoice(choice)}
                        disabled={store.isLoading || !isLastTurn}
                      />
                    ))}
                  </ChoicesContainer>
                )}
              </div>
            );
          })}
          {store.isLoading && store.history.length > 0 && <Spin />}
          {store.error && <Alert message={store.error} type="error" />}
          <div ref={anchorRef} />
        </StyledGameWindow>
      </ContentWrapper>
      <GameFooter />
    </Layout>
  );
};

export default GamePage;