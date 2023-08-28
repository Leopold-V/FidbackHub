import { useEffect, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

export const ScreenPlay = ({ htmlToCanvas }: { htmlToCanvas: Promise<HTMLCanvasElement> }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onButtonClick();
  }, []);

  const onButtonClick = () => {
    //const node = ref.current as HTMLElement
    const node = document.getElementsByTagName('html')[0];
    //const container = document.getElementsByTagName('canvas')[0]
    htmlToCanvas
      .then(function (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        ref.current?.appendChild(canvas);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <div className="bg-gray-500 absolute top-0 m-4 w-3/4 p-3">
      <button onClick={onButtonClick} className="px-3 py-1 bg-red-400 rounded hover:bg-red-300 transition duration-200">
        Click for image!
      </button>
      <div ref={ref} className="h-full w-full object-contain"></div>
    </div>
  );
};
