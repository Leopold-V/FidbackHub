import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { ButtonOpen } from './components/ButtonOpen';
import { Form } from './components/Form';

// apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg=="

const card = (height = 300) => ({
  open: { opacity: 1, height: height, clipPath: 'circle(100%)' },
  closed: { opacity: 0, height: 0, clipPath: 'circle(40%)' },
});

const button = {
  open: { top: 0, bottom: 'auto' },
  closed: { bottom: 0 },
};

function App() {
  const [open, setopen] = useState(false);

  return (
    <Container as={motion.div}>
      <FormContainer as={motion.div}
        animate={open ? 'open' : 'closed'}
        variants={card()}
        initial={false}
      >
        <Form apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />
      </FormContainer>
      <ButtonContainer as={motion.div} animate={open ? 'open' : 'closed'} variants={button} initial={false}>
        <ButtonOpen open={open} setopen={setopen} />
      </ButtonContainer>
    </Container>
  )
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 384px;
`

const ButtonContainer = styled.div`
position: absolute;
`

const Container = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: fixed;
  bottom: 0px;
  right: 0px;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
  button {
    border: none;
  }
`

export default App
