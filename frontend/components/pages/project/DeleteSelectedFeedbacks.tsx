import { Modal } from 'components/common/Modal';
import { SpinnerButtonDanger } from 'components/common/Spinner';

const message = `Are you sure you want to delete? All of this data will be permanently
removed. This action cannot be undone.`;

export const DeleteSelected = ({ loading, handleDeleteSelected, open, setopen }) => {
  const handleClick = () => {
    setopen(true);
  };
  return (
    <>
      <button
        type="submit"
        className="duration-200 mx-auto inline-flex items-center justify-center rounded px-3 py-2 text-sm font-medium border border-red-500 bg-secondaryBackground hover:border-red-500  text-red-500 hover:text-white disabled:bg-red-400 disabled:text-red-700 hover:bg-red-500 outline-none focus:ring-2 focus:ring-red-500"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <SpinnerButtonDanger />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="-ml-1 mr-3 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        )}
        <span>Delete</span>
      </button>
      <Modal
        open={open}
        setopen={setopen}
        handleConfirm={handleDeleteSelected}
        title="Remove feedbacks"
        message={message}
      />
    </>
  );
};
