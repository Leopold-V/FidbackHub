export const DividerTitle = ({ title }: { title: string }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-3Background" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 text-lg font-medium">{title}</span>
      </div>
    </div>
  );
};
