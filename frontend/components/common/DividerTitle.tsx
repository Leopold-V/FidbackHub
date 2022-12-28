export const DividerTitle = ({ title }: { title: string }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-gray-50 px-3 text-lg font-medium text-gray-900">{title}</span>
      </div>
    </div>
  );
};
