import { useCallback, useEffect, useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';

export const ScreenPlay = ({ htmlToCanvas }: { htmlToCanvas: Promise<HTMLCanvasElement> }) => {
  let ref = useRef<HTMLDivElement>(null);
  const [canvasready, setcanvasready] = useState(false);

  const onButtonClick = () => {
    htmlToCanvas
      .then(function (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        ref.current?.appendChild(canvas);
        setcanvasready(true);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  useEffect(() => {
    onButtonClick();
  }, []);

  useEffect(() => {
    const canvas = ref.current?.firstElementChild;
    if (canvas) {
      console.log(canvas);
      /* @ts-ignore */
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = 'red';
        context.lineJoin = 'round';
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(50, 150);
        context.closePath();

        context.stroke();
      }
    }
  }, [canvasready]);

  return (
    <div className="bg-gray-500 absolute top-0 m-4 w-3/4 p-3">
      <h2 onClick={onButtonClick} className="py-2">
        Screen capture
      </h2>
      <div ref={ref} className="h-full w-full object-contain"></div>
    </div>
  );
};
