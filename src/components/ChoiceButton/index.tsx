import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-right: 12px;
  margin-bottom: 12px;
  border-color: #00ffff;
  color: #00ffff;
  background: transparent;

  &:hover,
  &:focus {
    border-color: #ffffff !important;
    color: #ffffff !important;
    background: rgba(0, 255, 255, 0.1) !important;
    box-shadow: 0 0 10px #00ffff;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ChoiceButton = ({ text, onClick, disabled }: ChoiceButtonProps) => {
  return (
    <StyledButton type="primary" ghost onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default ChoiceButton;
