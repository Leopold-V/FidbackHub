export const Canvas = ({ width, height }: { width: number; height: number }) => {
  return <canvas height={height} width={width} />;
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};
