import { ReactNode, useState } from 'react';
import { IframeForm } from './components/IframeForm';
import { IframeButton } from './components/IframeButton';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';

const Head: ReactNode = <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />;

function App({ apiKey }: { apiKey: string }) {
  const [open, setopen] = useState(false);

  /*
  const htmlToCanvas = () => {
    const node = document.getElementsByTagName('html')[0];
    //const container = document.getElementsByTagName('canvas')[0]
    return htmlToImage.toCanvas(node, { filter: filterNode, cacheBust: true, includeQueryParams: true });
  };
  */

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

function filterNode(node: HTMLElement) {
  if (node instanceof Text) {
    return true;
  }
  return (
    [
      'div',
      'span',
      'p',
      'i',
      'strong',
      'main',
      'aside',
      'article',
      'pre',
      'code',
      'time',
      'address',
      'header',
      'footer',
      'body',
      'img',
    ].includes(node.tagName.toLowerCase()) || /^h[123456]$/i.test(node.tagName)
  );
}

export default App;
