import React from 'react';
import styled from 'styled-components';

type ButtonOpenProps = {
  open: boolean;
  setopen: (open: boolean) => void;
};

export const ButtonOpen = ({ open, setopen }: ButtonOpenProps) => {
  const handleClick = () => {
    //@ts-ignore
    setopen((open: boolean) => !open);
  };

  return (
    <Button
      onClick={handleClick}
    >
      <Title>Feedback</Title>
      {open && (
        <IconContainer>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </Svg>
        </IconContainer>
      )}
    </Button>
  );
};

const Svg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`

const IconContainer = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
`

const Title = styled.h3`
text-align: center;
padding-top: 12px;
padding-bottom: 12px;
`

const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;  
position: relative;
background-color: rgb(79 70 229);
color: white;
border-top-left-radius: 4px;
border-top-right-radius: 4px;
width: 384px;
height: 48px;
outline: none;
`