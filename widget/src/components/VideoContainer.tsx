export const VideoContainer = ({ video }: { video: string }) => {
  return (
    <div className="bg-gray-50 m-2 w-3/4 rounded h-full overflow-hidden flex flex-col justify-end z-10">
      <div className="flex-grow bg-gray-200 p-3 flex flex-col h-full justify-center items-center">
        <video controls>
          <source src={video} type="video/webm" />
        </video>
      </div>
    </div>
  );
};
