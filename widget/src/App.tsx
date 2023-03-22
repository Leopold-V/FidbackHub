import { useState } from 'react';
import { motion } from 'framer-motion'
import { ButtonOpen } from './components/ButtonOpen';
import { Form } from './components/Form';

const widget_layout = {
  open: { width: 384 },
  closed: { width: 100},
};

function App({apiKey}: {apiKey: string}) {
  const [open, setopen] = useState(false);

  return (
    <div className="fixed bottom-0 right-0 text-gray-800 bg-gray-50 rounded-t">
      <motion.div
      animate={open ? 'open' : 'closed'} variants={widget_layout} initial={false}
      className="relative">
      <Form open={open} apiKey={apiKey} />
      <ButtonOpen setopen={setopen} open={open} />
      </motion.div>
    </div>
  )
}

export default App
