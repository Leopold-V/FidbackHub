import { motion } from 'framer-motion';

type ButtonOpenProps = {
  open: boolean;
  setopen: (open: boolean) => void;
};

const button = {
  open: { top: 0, width: 384, bottom: 'auto' },
  closed: { bottom: 0, width: 100 },
};

export const ButtonOpen = ({ open, setopen }: ButtonOpenProps) => {
  const handleClick = () => {
    setopen(!open);
  };

  return (
    <motion.div animate={open ? 'open' : 'closed'} variants={button} initial={false} className="absolute w-full">
      <button
        className={`bg-indigo-600 text-white rounded-t w-full
    h-12 flex items-center justify-center relative`}
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
      </button>
    </motion.div>
  );
};
