import { ReactNode, useState } from 'react';
import { IframeForm } from './components/IframeForm';
import { IframeButton } from './components/IframeButton';
import * as htmlToImage from 'html-to-image';

const Head: ReactNode = <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />;

function App({ apiKey }: { apiKey: string }) {
  const [open, setopen] = useState(false);

  const htmlToCanvas = () => {
    const node = document.getElementsByTagName('html')[0];
    //const container = document.getElementsByTagName('canvas')[0]
    return htmlToImage.toCanvas(node);
  };

  return (
    <>
      {open && <IframeForm Head={Head} open={open} setopen={setopen} apiKey={apiKey} htmlToCanvas={htmlToCanvas()} />}
      {!open && <IframeButton Head={Head} open={open} setopen={setopen} />}
    </>
  );
}

export default App;
