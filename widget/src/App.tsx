import { ReactNode, useState } from 'react';
import Frame from 'react-frame-component';
import { motion } from 'framer-motion';
import { ButtonOpen } from './components/ButtonOpen';
import { Form } from './components/Form';

/*
const widget_layout = {
  open: { width: 384 },
  closed: { width: 100},
};
*/

const Head: ReactNode = <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />;

function App({ apiKey }: { apiKey: string }) {
  const [open, setopen] = useState(false);

  return (
    <>
      {open && (
        <Frame head={Head} style={{ border: 'none', width: '100%', height: '100%' }} allowFullScreen>
          <div className="fixed bottom-0 right-0 text-gray-800 bg-gray-50 rounded-t">
            <Form open={open} setopen={setopen} apiKey={apiKey} />
          </div>
        </Frame>
      )}
      {!open && (
        <Frame head={Head} height={200} width={200} style={{ border: 'none'}}>
          <ButtonOpen setopen={setopen} open={open} />
        </Frame>
      )}
    </>
  );
}

export default App;
