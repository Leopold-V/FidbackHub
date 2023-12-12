import { FidbackhubMain } from './components/FidbackhubMain';

function App({screenshot }: { screenshot: string }) {
  return (
    <FidbackhubMain screenshot={screenshot} />
  );
}

export default App;
