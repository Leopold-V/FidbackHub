import { ReactNode } from 'react';
import Frame from 'react-frame-component';
import { Form } from './Form';

export const IframeForm = ({ Head, open, setopen, apiKey}: { Head: ReactNode, open: boolean, setopen: (open: boolean) => void, apiKey: string}) => {
    return (
        <Frame head={Head} style={{ border: 'none', width: '100%', height: '100%' }}>
            <div className="absolute h-full w-full">
                <Form open={open} setopen={setopen} apiKey={apiKey} />
            </div>
      </Frame>
    )
  }