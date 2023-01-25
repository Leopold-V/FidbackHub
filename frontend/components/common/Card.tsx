export const Card = ({ children }) => {
  return (
    <div className="border border-3Background hover:border-4Background bg-mainBackground duration-200 shadow sm:rounded">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
