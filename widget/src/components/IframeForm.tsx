import { ReactNode } from 'react';
import Frame from 'react-frame-component';
import { Form } from './Form';
import { ScreenPlay } from './ScreenPlay';

export const IframeForm = ({
  Head,
  open,
  setopen,
  apiKey,
}: {
  Head: ReactNode;
  open: boolean;
  setopen: (open: boolean) => void;
  apiKey: string;
}) => {
  return (
    <Frame head={Head} style={{ border: 'none', position: 'absolute', width: '100%', height: '100%', bottom: '0' }}>
      <Form open={open} setopen={setopen} apiKey={apiKey} />
      <ScreenPlay />
    </Frame>
  );
};
