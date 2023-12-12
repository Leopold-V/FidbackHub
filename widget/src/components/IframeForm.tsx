import { ReactNode, useState } from 'react';
import Frame from 'react-frame-component';
import { Form } from './Form';
import { ScreenPlay } from './ScreenPlay';

export const IframeForm = ({
  Head,
  open,
  setopen,
  apiKey,
  screenshot,
  htmlToCanvas,
}: {
  Head: ReactNode;
  open: boolean;
  setopen: (open: boolean) => void;
  apiKey: string;
  screenshot: string;
  htmlToCanvas: any;
}) => {
  const [loading, setloading] = useState(false);

  return (
    <Frame
      head={Head}
      id="fidbackhub_form_iframe"
      scrolling="no"
      style={{
        border: 'none',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        bottom: '0',
        verticalAlign: 'bottom',
        zIndex: '2147483647',
      }}
    >
      <div className="flex w-full h-screen relative">
        <div className="absolute h-full w-full opacity-70 bg-gray-500 -z-10"></div>
        {loading && (
          <div className="h-full w-full opacity-80 bg-gray-500 flex justify-center items-center absolute z-10">
            <div className="font-bold text-3xl">Loading...</div>
          </div>
        )}
        <ScreenPlay htmlToCanvas={htmlToCanvas} screenshot={screenshot} />
        <Form open={open} setopen={setopen} apiKey={apiKey} setloading={setloading} />
      </div>
    </Frame>
  );
};
