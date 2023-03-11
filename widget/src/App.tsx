import { useState } from 'react';
import { ButtonOpen } from './components/ButtonOpen';
import { Form } from './components/Form';

function App() {
  const [open, setopen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 text-gray-800 bg-gray-50 rounded-t">
      <div className="relative">
      <Form open={open} apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />
      <ButtonOpen setopen={setopen} open={open} />

      </div>
    </div>
  )
}

export default App
