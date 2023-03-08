import styled from 'styled-components';

function App() {
  return (
    <Container>
      Feedback
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
