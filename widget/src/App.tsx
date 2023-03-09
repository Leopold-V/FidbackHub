import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { ButtonOpen } from './components/ButtonOpen';
import { Form } from './components/Form';

// apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg=="

const card = (height = 300) => ({
  open: { opacity: 1, height: height, clipPath: 'circle(100%)' },
  closed: { opacity: 0, height: 0, clipPath: 'circle(40%)' },
});

const button = {
  open: { top: 0, bottom: 'auto' },
  closed: { bottom: 0 },
};

function App() {
  const [open, setopen] = useState(false);

  return (
    <div className="fixed bottom-0 right-0 text-gray-800 bg-gray-50 rounded-t">
      <div className="relative">
        <motion.div
          animate={open ? 'open' : 'closed'}
          variants={card()}
          initial={false}
          className={`shadow-lg flex flex-col items-center px-3 w-96`}
        >
          <Form apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />
        </motion.div>
        <motion.div animate={open ? 'open' : 'closed'} variants={button} initial={false} className="absolute">
          <ButtonOpen setopen={setopen} open={open} />
        </motion.div>
      </div>
    </div>
  )
}

export default App
