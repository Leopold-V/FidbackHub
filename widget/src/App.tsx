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
        <Frame head={Head} height={500} width={384} style={{ border: 'none', backgroundColor: 'red' }}>
          <div className="fixed bottom-0 right-0 text-gray-800 bg-gray-50 rounded-t">
            <div className={`relative ${open ? 'w-[384px]' : 'w-[120px]'}`}>
              <Form open={open} apiKey={apiKey} />
            </div>
          </div>
        </Frame>
      )}
      <Frame head={Head} height={200} width={200} style={{ border: 'none', backgroundColor: 'green' }}>
        <ButtonOpen setopen={setopen} open={open} />
        <div className="fixed bottom-0 right-0 text-gray-800 bg-gray-50 rounded-t">
          <div className={`relative ${open ? 'w-[384px]' : 'w-[120px]'}`}></div>
        </div>
      </Frame>
    </>
  );
}

export default App;
