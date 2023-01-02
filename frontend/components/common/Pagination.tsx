export const Pagination = ({
  pageIndex,
  setpageIndex,
  pageNumber,
  totalratings,
  nbCurrentFeedbackDisplay,
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
      className="flex items-center justify-between border-t border-3Background bg-mainBackground px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-secondaryText">
          Showing <span className="font-medium">{nbCurrentFeedbackDisplay}</span> to{' '}
          <span className="font-medium">{pageLength}</span> of <span className="font-medium">{totalratings}</span>{' '}
          results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {nbCurrentFeedbackDisplay > 0 && (
          <>
            <button
              className="relative inline-flex items-center disabled:cursor-not-allowed disabled:bg-zinc-700 rounded-md border border-4Background bg-secondaryBackground px-4 py-2 text-sm font-medium text-secondaryText hover:text-indigo-500 duration-150"
              disabled={pageIndex === 0}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="relative ml-3 inline-flex items-center disabled:cursor-not-allowed disabled:bg-zinc-700 rounded-md border  border-4Background bg-secondaryBackground px-4 py-2 text-sm font-medium text-secondaryText hover:text-indigo-500 duration-150"
              disabled={pageIndex === pageNumber - 1}
              onClick={handleNext}
            >
              Next
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
