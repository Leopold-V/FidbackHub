import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css';

import { ButtonOpen } from './ButtonOpen';
import { Form } from './Form';

const card = (height = 300) => ({
  open: { opacity: 1, height: height, clipPath: 'circle(100%)' },
  closed: { opacity: 0, height: 0, clipPath: 'circle(40%)' },
});

const button = {
  open: { top: 0, bottom: 'auto' },
  closed: { bottom: 0 },
};

const FidbackHub = ({ apiKey, height = 300 }: FidbackHubProps) => {
  const [open, setopen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 text-gray-800 bg-gray-50 rounded-t">
      <div className="relative">
        <motion.div
          animate={open ? 'open' : 'closed'}
          variants={card(height)}
          initial={false}
          className={`shadow-lg flex flex-col items-center px-3 w-96`}
        >
          <Form apiKey={apiKey} />
        </motion.div>
        <motion.div animate={open ? 'open' : 'closed'} variants={button} initial={false} className="absolute">
          <ButtonOpen setopen={setopen} open={open} />
        </motion.div>
      </div>
    </div>
  );
};

type FidbackHubProps = {
  apiKey: string;
  height?: number;
};

export default FidbackHub;
