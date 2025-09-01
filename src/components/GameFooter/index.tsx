import { Layout } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

const StyledFooter = styled(Footer)`
  background: #0a0a0a !important;
  color: #555;
  text-align: center;
  border-top: 1px solid #333;
  padding: 12px 50px;
`;

const GameFooter = () => {
  return (
    <StyledFooter>
      AI Adventure Engine © 2025 | Powered by Dify & Gemini
    </StyledFooter>
  );
};

export default GameFooter;
