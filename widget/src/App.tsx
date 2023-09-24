import { ReactNode, useState } from 'react';
import html2canvas from 'html2canvas';
import { IframeForm } from './components/IframeForm';
import { IframeButton } from './components/IframeButton';

const Head: ReactNode = <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />;

function App({ apiKey }: { apiKey: string }) {
  const [open, setopen] = useState(false);

  const htmlToCanvas = () => {
    const node = document.getElementsByTagName('html')[0];
    return html2canvas(node, { allowTaint: true, useCORS: true });
  };

  return (
    <>
      {open && <IframeForm Head={Head} open={open} setopen={setopen} apiKey={apiKey} htmlToCanvas={htmlToCanvas()} />}
      {!open && <IframeButton Head={Head} open={open} setopen={setopen} />}
    </>
  );
}

export default App;
