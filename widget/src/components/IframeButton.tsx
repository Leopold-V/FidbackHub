import { ReactNode } from 'react';
import Frame from 'react-frame-component';
import { ButtonOpen } from './ButtonOpen';

export const IframeButton = ({ Head, open, setopen}: { Head: ReactNode, open: boolean, setopen: (open: boolean) => void }) => {
    return (
      <Frame head={Head} height={50} width={200} style={{ border: 'none', position: 'absolute', right: '0', bottom: '0'}}>
            <ButtonOpen setopen={setopen} open={open} />
      </Frame>
    )
  }
