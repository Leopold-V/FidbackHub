import React from 'react';
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
} from '@tanstack/react-table';
import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils';
import { feedbackType } from '../../../types';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]?.itemRank!, rowB.columnFiltersMeta[columnId]?.itemRank!);
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const FeedbacksTable = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<feedbackType, any>[]>(
    () => [
      {
        accessorKey: 'title',
        cell: (info) => info.getValue(),
        header: () => 'Title',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.description,
        id: 'description',
        cell: (info) => info.getValue(),
        header: () => 'Description',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => 'Status',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.author_email,
        id: 'author_email',
        header: 'Author',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const [data, setData] = React.useState<feedbackType[]>(() => feedbacks);
  const refreshData = () => setData((old) => feedbacks);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="w-full flex justify-center">
      <div className="p-2 text-secondaryText w-3/4 mb-4">
        <div className="w-full">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="pl-4 w-full text-secondaryText focus:text-mainText rounded-md border duration-200 focus:ring-2 focus:ring-indigo-500 border-3Background bg-3Background bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none text-sm"
            placeholder="Search all columns..."
          />
        </div>
        <div />
        <table className="border border-secondaryBackground mt-4 w-full bg-mainBackground">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className="text-sm font-semibold p-2 space-y-1">
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="border border-3Background hover:bg-secondaryBackground duration-200">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="py-2 px-3 text-center text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center gap-2 text-sm mx-auto mt-2 w-full justify-center">
          <button
            className="relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium text-secondaryText hover:text-indigo-500 outline-none duration-150"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium text-secondaryText hover:text-indigo-500 outline-none duration-150"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background bg-mainBackground px-3 py-1 text-sm font-medium text-secondaryText hover:text-indigo-500 outline-none duration-150"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="bg-mainBackground relative inline-flex items-center disabled:cursor-not-allowed rounded-md border border-3Background  px-3 py-1 text-sm font-medium text-secondaryText hover:text-indigo-500 outline-none duration-150"
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
    </div>
  );
};

function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
    [column.getFacetedUniqueValues()],
  );

  return (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="pl-2 bg-mainBackground font-normal flex-grow w-36 text-secondaryText focus:text-mainText rounded-md border duration-200 focus:ring-2 focus:ring-indigo-500 border-3Background py-1.5 leading-5 placeholder-gray-500 focus:placeholder-gray-600 outline-none text-sm"
        list={column.id + 'list'}
      />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}
