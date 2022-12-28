export const Pagination = ({
  pageIndex,
  setpageIndex,
  pageNumber,
  totalratings,
  nbCurrentRatingsDisplay,
  pageLength,
}) => {
  const handlePrevious = () => {
    setpageIndex((pageIndex: number) => pageIndex - 1);
  };

  const handleNext = () => {
    setpageIndex((pageIndex: number) => pageIndex + 1);
  };

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{nbCurrentRatingsDisplay}</span> to{' '}
          <span className="font-medium">{pageLength}</span> of <span className="font-medium">{totalratings}</span>{' '}
          results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className="relative inline-flex items-center disabled:cursor-not-allowed disabled:bg-gray-50 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={pageIndex === 0}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center disabled:cursor-not-allowed disabled:bg-gray-50 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={pageIndex === pageNumber - 1}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </nav>
  );
};
