import React, { HTMLProps, useEffect, useState } from 'react';
import {
  Column,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
} from '@tanstack/react-table';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { feedbackType } from '../../../types';
import { HeaderWrapper } from 'components/common/HeaderWrapper';
import { DateButtonGroups } from '../dashboard/DateButtonsGroup';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { TableSection } from './TableSection';
import { PaginationSection } from './PaginationSection';
import Link from 'next/link';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

export const FeedbacksTable = ({
  feedbacks,
  setdateRange,
  projectId,
}: {
  feedbacks: feedbackType[];
  setdateRange;
  projectId: number;
}) => {
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<feedbackType, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            className="rounded"
            {...{
              checked: table.getIsAllPageRowsSelected(),
              indeterminate: table.getIsSomePageRowsSelected(),
              onChange: table.getToggleAllPageRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            className="rounded"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: 'title',
        cell: (info) => <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}><a className="cursor-pointer">{info.getValue()}</a></Link>,
        header: () => 'Title',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.type,
        id: 'type',
        cell: (info) => <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}><a className="cursor-pointer">{info.getValue()}</a></Link>,
        header: () => 'Type',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a
              className={`${
                info.getValue() === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              } px-2.5 py-0.5 text-xs font-medium rounded-full cursor-pointer`}
            >
              {info.getValue()}
            </a>
          </Link>
        ),
        header: () => 'Status',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.state,
        id: 'state',
        cell: (info) => <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}><a className="cursor-pointer">{info.getValue()}</a></Link>,
        header: () => 'State',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.author_email,
        id: 'author_email',
        header: 'Author',
        cell: (info) => <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}><a className="cursor-pointer">{info.getValue()}</a></Link>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.createdAt,
        id: 'createdAt',
        header: 'Created at',
        cell: (info) => <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}><a className="cursor-pointer">{formatDateToDisplay(info.getValue())}</a></Link>,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const [data, setData] = useState<feedbackType[]>(() => feedbacks);

  useEffect(() => {
    setData(feedbacks);
  }, [feedbacks]);

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
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

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="w-full">
      <HeaderWrapper>
        <h2 className="text-secondary">Feedbacks</h2>
        <div className="mt-4 flex items-center justify-between space-x-4">
          <div className="flex space-x-4">
            <FilterStatus column={table.getHeaderGroups()[0].headers[3].headerGroup.headers[3].column} />
            <FilterType column={table.getHeaderGroups()[0].headers[2].headerGroup.headers[2].column} />
            <FilterState column={table.getHeaderGroups()[0].headers[4].headerGroup.headers[4].column} />
          </div>
          <div className="relative">
            <div className="pointer-events-none text-secondaryText absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              className="pl-10 text-secondaryText focus:text-mainText rounded-md border duration-200 focus:ring-2 focus:ring-indigo-500 border-3Background bg-3Background bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none text-sm"
              placeholder="Search all columns..."
            />
          </div>
          <DateButtonGroups setdateRange={setdateRange} />
        </div>
      </HeaderWrapper>
      <div className="w-full">
        <div className="text-secondaryText px-10">
          <TableSection projectId={projectId} table={table} />
          <PaginationSection table={table} setData={setData} />
        </div>
      </div>
    </div>
  );
};

function FilterStatus({ column }: { column: Column<any, unknown> }) {
  const onChange = (e) => {
    column.setFilterValue(e.target.value);
  };

  return (
    <div className="space-x-2 flex items-center">
      <label className="text-sm text-secondaryText" htmlFor={`${column.id}-select`}>
        Status
      </label>
      <select
        name={column.id}
        id={`${column.id}-select`}
        onChange={onChange}
        className={`duration-200 text-secondaryText w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        <option value="" key="" className="text-secondaryBackground">
          All
        </option>
        <option className="text-secondaryBackground" value="Open" key="Open">
          Open
        </option>
        <option className="text-secondaryBackground" value="Close" key="Close">
          Close
        </option>
      </select>
    </div>
  );
}

function FilterType({ column }: { column: Column<any, unknown> }) {
  const onChange = (e) => {
    column.setFilterValue(e.target.value);
  };

  return (
    <div className="space-x-2 flex items-center">
      <label className="text-sm text-secondaryText" htmlFor={`${column.id}-select`}>
        Type
      </label>
      <select
        name={column.id}
        id={`${column.id}-select`}
        onChange={onChange}
        className={`duration-200 text-secondaryText w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        <option value="" key="" className="text-secondaryBackground">
          All
        </option>
        <option className="text-secondaryBackground" value="General feedback" key="General feedback">
          General feedback
        </option>
        <option className="text-secondaryBackground" value="Bug report" key="Bug report">
          Bug report
        </option>
        <option className="text-secondaryBackground" value="Feature request" key="Feature request">
          Feature request
        </option>
      </select>
    </div>
  );
}

function FilterState({ column }: { column: Column<any, unknown> }) {
  const onChange = (e) => {
    column.setFilterValue(e.target.value);
  };

  return (
    <div className="space-x-2 flex items-center">
      <label className="text-sm text-secondaryText" htmlFor={`${column.id}-select`}>
        State
      </label>
      <select
        name={column.id}
        id={`${column.id}-select`}
        onChange={onChange}
        className={`duration-200 text-secondaryText w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        <option value="" key="" className="text-secondaryBackground">
          All
        </option>
        <option className="text-secondaryBackground" value="New" key="New">
          New
        </option>
        <option className="text-secondaryBackground" value="In progress" key="In progress">
          In progress
        </option>
        <option className="text-secondaryBackground" value="Resolved" key="Resolved">
          Resolved
        </option>
        <option className="text-secondaryBackground" value="Rejected" key="Rejected">
          Rejected
        </option>
      </select>
    </div>
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

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
}
