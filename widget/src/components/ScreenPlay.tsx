import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Image } from 'react-konva';

export const ScreenPlay = ({ htmlToCanvas }: { htmlToCanvas: any }) => {
  let ref = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState<any>([]);
  const isDrawing = useRef(false);
  const [imagedata, setimagedata] = useState('');

  const handleMouseDown = (e: MouseEvent) => {
    isDrawing.current = true;
    //@ts-ignore
    const pos = e.target?.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    //@ts-ignore
    const stage = e.target?.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const createCanvas = () => {
    htmlToCanvas.then(function (dataUrl: any) {
      setimagedata(dataUrl);
    });
  };

  useEffect(() => {
    createCanvas();
  }, []);

  return (
    <div className="bg-gray-50 absolute top-0 m-4 w-3/4 h-3/4 p-3">
      <h2 className="py-2">Screen capture</h2>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <div className="object-contain w-full h-full" ref={ref}>
        <Stage
          width={ref.current?.offsetWidth}
          height={ref.current?.offsetHeight - 70}
          //@ts-ignore
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          className=""
        >
          <Layer>
            <Text text="Just start drawing" x={5} y={30} />
            <Image image={imagedata} />
            {lines.map((line: any, i: number) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={3}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
