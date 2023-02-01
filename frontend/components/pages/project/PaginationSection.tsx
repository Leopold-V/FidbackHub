import React, { HTMLProps, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { deleteManyFeedbacks } from '../../../services/feedback.service';
import { DeleteSelected } from './DeleteSelectedFeedbacks';

export const PaginationSection = (props) => {
  const { data: session } = useSession();
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);

  const handleDeleteSelected = async () => {
    setloading(true);
    try {
      await deleteManyFeedbacks(
        props.table.getSelectedRowModel().flatRows.map((ele) => ele.original.id),
        session.jwt,
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
      <div className="flex items-center gap-2 text-sm w-full justify-center mt-6">
        {props.table.getSelectedRowModel().flatRows.length > 0 && (
          <div className="">
            <DeleteSelected
              loading={loading}
              handleDeleteSelected={handleDeleteSelected}
              open={open}
              setopen={setopen}
            />
          </div>
        )}
        <button
          className="text-muted relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => props.table.setPageIndex(0)}
          disabled={!props.table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="text-muted relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => props.table.previousPage()}
          disabled={!props.table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="text-muted relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => props.table.nextPage()}
          disabled={!props.table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="text-muted bg-mainBackground relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background  px-3 py-1 text-sm font-medium  hover:text-indigo-500 outline-none duration-150"
          onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
          disabled={!props.table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {props.table.getState().pagination.pageIndex + 1} of {props.table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={props.table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              props.table.setPageIndex(page);
            }}
            className={`duration-200 w-16 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          />
        </span>
        <select
          className={`duration-200 w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          value={props.table.getState().pagination.pageSize}
          onChange={(e) => {
            props.table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
