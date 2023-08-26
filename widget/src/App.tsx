import { ReactNode, useState } from 'react';
import { IframeForm } from './components/IframeForm';
import { IframeButton } from './components/IframeButton';

const Head: ReactNode = <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />;

function App({ apiKey }: { apiKey: string }) {
  const [open, setopen] = useState(false);

  return (
    <>
      {open && <IframeForm Head={Head} open={open} setopen={setopen} apiKey={apiKey} />}
      {!open && <IframeButton Head={Head} open={open} setopen={setopen} />}
    </>
  );
}

export default App;
