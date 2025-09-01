import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledStory = styled.p`
  animation: ${fadeIn} 0.8s ease-out;
  font-size: 1.1rem;
  line-height: 1.7;
  white-space: pre-wrap; // 保留换行符
  color: #c0c0c0;
  margin-bottom: 2rem;
`;

interface StoryBlockProps {
  text: string;
}

const StoryBlock = ({ text }: StoryBlockProps) => {
  return <StyledStory>{text}</StyledStory>;
};

export default StoryBlock;
