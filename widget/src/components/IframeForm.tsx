import { ReactNode } from 'react';
import Frame from 'react-frame-component';
import { Form } from './Form';
import { ScreenPlay } from './ScreenPlay';

export const IframeForm = ({
  Head,
  open,
  setopen,
  apiKey,
  htmlToCanvas,
}: {
  Head: ReactNode;
  open: boolean;
  setopen: (open: boolean) => void;
  apiKey: string;
  htmlToCanvas: any;
}) => {
  return (
    <Frame
      head={Head}
      scrolling="no"
      style={{
        border: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        bottom: '0',
        verticalAlign: 'bottom',
      }}
    >
      <div className="flex w-full h-screen">
        <ScreenPlay htmlToCanvas={htmlToCanvas} />
        <Form open={open} setopen={setopen} apiKey={apiKey} />
      </div>
    </Frame>
  );
};
