import { motion } from 'framer-motion'
import style from './buttonopen.module.css';

type ButtonOpenProps = {
  open: boolean;
  setopen: (open: boolean) => void;
};

const button = {
  open: { top: 0, bottom: 'auto' },
  closed: { bottom: 0 },
};

export const ButtonOpen = ({ open, setopen }: ButtonOpenProps) => {
  const handleClick = () => {
    //@ts-ignore
    setopen((open: boolean) => !open);
  };

  return (
    <motion.button
    animate={open ? 'open' : 'closed'} variants={button} initial={false}
      className={style.button}
      style={{"backgroundColor": "rgb(79 70 229)"}}
      onClick={handleClick}
    >
      <h1 className="text-center py-3">Feedback</h1>
      {open && (
        <span className="absolute top-2 left-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      )}
    </motion.button>
  );
};