import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Image } from 'react-konva';

export const ScreenPlay = ({ htmlToCanvas }: { htmlToCanvas: any }) => {
  let ref = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState<any>([]);
  const [imagedata, setimagedata] = useState<CanvasImageSource | undefined>();

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target?.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

  const createCanvas = () => {
    htmlToCanvas.then(function (dataUrl: any) {
      setimagedata(dataUrl);
    });
  };

  useEffect(() => {
    createCanvas();
  }, []);

  return (
    <div className="bg-gray-50 m-2 w-3/4 p-3 rounded">
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
      <div className="object-contain w-full h-full" ref={ref} id="fidbackhub_editor_content">
        <Stage
          width={ref.current?.offsetWidth}
          //@ts-ignore
          height={ref.current?.offsetHeight - 70}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          className=""
        >
          <Layer>
            <Text text="Just start drawing" x={5} y={30} />
            <Image
              width={ref.current?.offsetWidth}
              //@ts-ignore
              height={ref.current?.offsetHeight - 70}
              image={imagedata}
            />
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
