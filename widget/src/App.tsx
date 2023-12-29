import { FidbackhubMain } from './components/FidbackhubMain';

function App({ screenshot, video }: { screenshot: string; video: string }) {
  return <FidbackhubMain screenshot={screenshot} video={video} />;
}

export default App;
