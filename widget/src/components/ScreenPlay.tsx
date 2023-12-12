import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Image } from 'react-konva';
import {
  ArrowDownRightIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LanguageIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function ButtonEditorGroup({
  setTool,
  lines,
  setLines,
  colorselected,
  setcolorselected,
}: {
  setTool: (tool: string) => void;
  lines: any;
  setLines: any;
  colorselected: string;
  setcolorselected: (colorselected: string) => void;
}) {
  const [lastLines, setlastLines] = useState<any>([]);
  const [active, setactive] = useState('pen');

  return (
    <div className="flex flex-row items-center justify-center divide-x divide-gray-500">
      <div className="flex flex-row items-center justify-center">
        <button
          className={classNames(
            'duration-200 flex items-center justify-center rounded-l-sm border-b border-t border-l border-gray-500 hover:text-white px-4 py-2 text-sm font-medium shadow-md disabled:bg-indigo-400 hover:bg-indigo-600',
            active === 'pen' ? 'bg-indigo-600 text-white' : 'bg-white  text-gray-600',
          )}
          value="pen"
          onClick={(e) => {
            setactive(e.currentTarget.value);
            setTool(e.currentTarget.value);
          }}
        >
          <PaintBrushIcon className="h-5 w-5" />
        </button>
        <button
          className={classNames(
            'duration-200 flex items-center justify-center border-b border-t border-gray-500  hover:text-white px-4 py-2 text-sm font-medium shadow-sm disabled:bg-indigo-400 hover:bg-indigo-600',
            active === 'text' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600',
          )}
          value="text"
          onClick={(e) => {
            setactive(e.currentTarget.value);
            setTool(e.currentTarget.value);
          }}
        >
          <LanguageIcon className="h-5 w-5" />
        </button>
        <button
          className={classNames(
            'duration-200 flex items-center justify-center border-b border-t border-gray-500  hover:text-white px-4 py-2 text-sm font-medium shadow-sm disabled:bg-indigo-400 hover:bg-indigo-600',
            active === 'arrow' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600',
          )}
          value="arrow"
          onClick={(e) => {
            setactive(e.currentTarget.value);
            setTool(e.currentTarget.value);
          }}
        >
          <ArrowDownRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <button
          className={classNames(
            'duration-200 relative flex items-center justify-center border-b border-t bg-white border-gray-500 px-4 py-2 text-sm font-medium shadow-sm disabled:bg-indigo-400 hover:bg-indigo-600',
          )}
          value="colorpicker"
        >
          <input
            type="color"
            className="opacity-0 w-full h-full rounded-full absolute bg-transparent"
            value={colorselected}
            onChange={(e) => setcolorselected(e.target.value)}
          />
          <div className="h-5 w-5 flex justify-center items-center overflow-hidden">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: `${colorselected}` }}></div>
          </div>
        </button>
        <button
          className={classNames(
            'duration-200 flex items-center justify-center bg-white border-b border-t border-gray-500 text-gray-600 hover:text-white px-4 py-2 text-sm font-medium shadow-sm disabled:bg-indigo-400 hover:bg-indigo-600',
          )}
          value="pen"
          onClick={(e) => {
            if (lines.length > 0) {
              setlastLines((lastLines: any) => [...lastLines, [...lines].pop()]);
              setLines((lines: any[]) => [...lines.slice(0, -1)]);
            }
            return;
          }}
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
        </button>
        <button
          className={classNames(
            'duration-200 flex items-center justify-center bg-white rounded-r-sm border-b border-t border-r border-gray-500 text-gray-600 hover:text-white px-4 py-2 text-sm font-medium shadow-sm disabled:bg-indigo-400 hover:bg-indigo-600',
          )}
          value="pen"
          onClick={(e) => {
            if (lastLines.length > 0) {
              setLines((lines: any) => [...lines, [...lastLines].pop()]);
              setlastLines((lastLines: any[]) => [...lastLines.slice(0, -1)]);
            }
            return;
          }}
        >
          <ArrowUturnRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export const ScreenPlay = ({ screenshot }: { screenshot: any }) => {
  let ref = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState<any>([]);
  const [imagedata, setimagedata] = useState<CanvasImageSource | undefined>();
  //const [imagedata, setimagedata] = useState();

  const [loading, setloading] = useState(true);
  const [colorselected, setcolorselected] = useState('#df4b26');
  const [ratio, setratio] = useState({xy: 1, x: 1, y: 1});

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target?.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], color: colorselected }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target?.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const loadImage = () => {
      const img = new window.Image();
      img.src = screenshot;
      setimagedata(img);
      setloading(false);
  };

  useEffect(() => {
    if (ref.current) {
      const ratioXY = 0.46867676102;
      console.log(ratioXY);
      console.log('screen height: ', screen.height, screen.availHeight);
      console.log('window: ',window.outerHeight, window.outerWidth);
      console.log('ref: ',ref.current?.offsetWidth , ref.current?.offsetHeight);
      console.log('screen width: ', screen.width, screen.availWidth);
      const ratioX = ref.current?.offsetWidth / window.outerWidth;
      const ratioY = ref.current?.offsetHeight / window.outerHeight;
      console.log(ratioX, ratioY);
      
      setratio({xy: ratioXY, x: ratioX, y: ratioY});
    }
    loadImage();
  }, [])

  return (
    <div className="bg-gray-50 m-2 w-3/4 rounded h-full overflow-hidden flex flex-col justify-end z-10">
      <div className="flex flex-col flex-grow justify-center items-center py-2">
        <ButtonEditorGroup
          setTool={setTool}
          lines={lines}
          setLines={setLines}
          colorselected={colorselected}
          setcolorselected={setcolorselected}
        />
      </div>
      <div className="flex-grow bg-gray-200 p-3 flex flex-col h-full justify-center items-center">
        <div className="object-contain overflow-hidden w-full h-full flex justify-center items-center" ref={ref} id="fidbackhub_editor_content">
          {!loading ? (
            <Stage
            //@ts-ignore
              width={ref.current?.clientWidth} 
              //@ts-ignore
              height={ref.current?.clientWidth * ratio.xy}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              className="rounded shadow-lg flex justify-center items-center overflow-hidden"
            >
              <Layer>
                <Image
                  width={parent.outerWidth}
                  height={self.outerWidth * ratio.xy}
                  scale={{ x: ratio.x, y: ratio.y }}
                  image={imagedata}
                />
                {lines.map((line: any, i: number) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={3}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                  /> 
                ))}
              </Layer>
            </Stage>
          ) : (
            <div className="h-full flex justify-center items-center">
              <div className="text-lg">Loading the screenshot...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
