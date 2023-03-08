import { useState } from 'react';
import styled from 'styled-components';
import { Button } from './components/Button';
import { Form } from './components/Form';

// apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg=="

function App() {
  const [open, setopen] = useState(false);

  const handleOpen = () =>{
    setopen(true);
  }

  return (
    <Container>
      <Button onClick={handleOpen}>Feedback</Button>
      {open && <Form apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />}
    </Container>
  )
}

const Container = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: rgb(239, 239, 239);
  background-color: rgb(0, 28, 165);
  padding: 6px 15px;
  border-radius: 3px;
  position: fixed;
  bottom: 20px;
  right: 20px;
`

export default App
