import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { deleteManyFeedbacks } from '../../../services/feedback.service';
import { DeleteSelected } from './DeleteSelectedFeedbacks';
import { feedbackType } from 'types/index';

export const PaginationSection = ({ table, setData}) => {
  const { data: session } = useSession();
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);

  const handleDeleteSelected = async () => {
    setloading(true);
    const listFeedbacksToDelete = table.getSelectedRowModel().flatRows.map((ele) => ele.original.id);
    try {
      await deleteManyFeedbacks( listFeedbacksToDelete, session.jwt);
      setData((feedbacks: feedbackType[]) =>
      feedbacks.filter((ele) => !listFeedbacksToDelete.find((id) => +id === ele.id)),
    );
      toast.success('Feedbacks deleted!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col items-center text-sm w-full mt-6 relative">
        {table.getSelectedRowModel().flatRows.length > 0 && (
          <div className="lg:absolute">
            <DeleteSelected
              loading={loading}
              handleDeleteSelected={handleDeleteSelected}
              open={open}
              setopen={setopen}
            />
          </div>
        )}
        <div className="flex items-center justify-center w-full space-x-2">
        <button
          className="text-muted relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="text-muted relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="text-muted relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="text-muted bg-mainBackground relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background  px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className={`duration-200 w-16 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          />
        </span>
        <select
          className={`duration-200 w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>          
        </div>
      </div>
    </>
  );
};
