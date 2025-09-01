import { Layout } from 'antd';
import styled, { keyframes } from 'styled-components';

const { Header } = Layout;

const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #0ff,
      0 0 80px #0ff,
      0 0 90px #0ff,
      0 0 100px #0ff,
      0 0 150px #0ff;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`;

const StyledHeader = styled(Header)`
  background: #0a0a0a !important;
  color: #e0e0e0;
  text-align: center;
  border-bottom: 1px solid #333;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  color: #fff;
  animation: ${flicker} 3s infinite linear;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const GameHeader = () => {
  return (
    <StyledHeader>
      <Title>AI ADVENTURE ENGINE</Title>
    </StyledHeader>
  );
};

export default GameHeader;
