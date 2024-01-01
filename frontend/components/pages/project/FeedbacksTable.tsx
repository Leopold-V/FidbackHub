import React, { HTMLProps, useEffect, useState } from 'react';
import Link from 'next/link';
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
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  BellSnoozeIcon,
  CheckIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { feedbackPriorityType, feedbackStateType, feedbackType } from '../../../types';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { HeaderWrapper } from 'components/common/HeaderWrapper';
import { DateButtonGroups } from '../dashboard/DateButtonsGroup';
import { TableSection } from './TableSection';
import { PaginationSection } from './PaginationSection';
import { ButtonOutline } from 'components/common/Button';
import { ModalAddFeedback } from './ModalAddFeedback';
import { useDateFilterForFeedbacks } from '../../../hooks/useDateFilterForFeedbacks';
import dayjs from 'dayjs';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

export const FeedbacksTable = ({
  projectId,
  projectToken,
  feedbacks,
  setfeedbacks,
  projectTitle,
}: {
  projectId: number;
  projectToken: string;
  feedbacks: feedbackType[];
  setfeedbacks;
  projectTitle: string;
  // ugly but pass this to sync the date filter with all the table filters so that deleted feedbacks doesn't show with date filter
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [open, setopen] = useState(false);

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
        accessorFn: (row) => row.id,
        id: 'id',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer">{info.getValue()}</a>
          </Link>
        ),
        header: () => 'Id',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.title,
        id: 'title',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer">{info.getValue()}</a>
          </Link>
        ),
        header: () => 'Title',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.type,
        id: 'type',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer">{info.getValue()}</a>
          </Link>
        ),
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
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer flex items-center space-x-1">
              {generateStateIcon(info.getValue())}
              <span>{info.getValue()}</span>
            </a>
          </Link>
        ),
        header: () => 'State',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.priority,
        id: 'priority',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer flex items-center space-x-1">
              {generatePriorityIcon(info.getValue())}
              <span>{info.getValue()}</span>
            </a>
          </Link>
        ),
        header: () => 'Priority',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.author_email,
        id: 'author_email',
        header: 'Author',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer">{info.getValue()}</a>
          </Link>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.createdAt,
        id: 'createdAt',
        header: 'Created at',
        cell: (info) => (
          <Link href={`http://localhost:3000/project/${projectId}/feedback/${info.row.original.id}`}>
            <a className="cursor-pointer">{formatDateToDisplay(info.getValue())}</a>
          </Link>
        ),
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const [data, setData] = useState<feedbackType[]>(() => feedbacks);
  const [feedbacksFiltered, dateRange, setdateRange, setfeedbacksFiltered] = useDateFilterForFeedbacks(
    feedbacks,
    projectId,
    dayjs('2000-01-01').format('YYYY-MM-DD'),
  );

  useEffect(() => {
    setData(feedbacksFiltered);
  }, [feedbacksFiltered]);

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
    initialState: {
      sorting: [
        {
          id: 'createdAt',
          desc: true,
        },
      ],
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
    if (table.getState().columnFilters[0]?.id === 'createdAt') {
      if (table.getState().sorting[0]?.id !== 'createdAt') {
        table.setSorting([{ id: 'createdAt', desc: true }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="w-full">
      <HeaderWrapper>
        <div className="flex items-center space-x-5">
          <h2 className="text-secondary">Feedbacks</h2>
          <ButtonOutline onClick={() => setopen((open) => !open)}>New +</ButtonOutline>
        </div>
        <div className="mt-4 flex items-center justify-between lg:space-x-4 lg:space-y-0 space-y-3 lg:flex-row flex-col">
          <div className="flex space-x-4">
            <FilterStatus column={table.getHeaderGroups()[0].headers[4].headerGroup.headers[4].column} />
            <FilterType column={table.getHeaderGroups()[0].headers[3].headerGroup.headers[3].column} />
            <FilterState column={table.getHeaderGroups()[0].headers[5].headerGroup.headers[5].column} />
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
          <DateButtonGroups setdateRange={setdateRange} firstDate={feedbacks[0]?.createdAt} />
        </div>
      </HeaderWrapper>
      <div className="w-full">
        <div className="text-secondaryText px-10">
          <TableSection table={table} />
          <PaginationSection table={table} setData={setData} setfeedbacks={setfeedbacks} />
        </div>
      </div>
      <ModalAddFeedback
        open={open}
        setopen={setopen}
        projectToken={projectToken}
        setData={setData}
        projectId={projectId}
        projectTitle={projectTitle}
      />
    </div>
  );
};

function FilterStatus({ column }: { column: Column<any, unknown> }) {
  const onChange = (e) => {
    column.setFilterValue(e.target.value);
  };

  useEffect(() => {
    // Default value
    column.setFilterValue('Open');
  }, []);

  return (
    <div className="space-x-2 flex items-center">
      <label className="text-sm text-secondaryText" htmlFor={`${column.id}-select`}>
        Status
      </label>
      <select
        name={column.id}
        id={`${column.id}-select`}
        onChange={onChange}
        value={column.getFilterValue() as string}
        className={`duration-200 text-secondaryText w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-1 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        <option value="" key="" className="text-gray-200">
          All
        </option>
        <option className="text-gray-200" value="Open" key="Open">
          Open
        </option>
        <option className="text-gray-200" value="Close" key="Close">
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
        className={`duration-200 text-secondaryText w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-1 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        <option value="" key="" className="text-secondaryText">
          All
        </option>
        <option className="text-secondaryText" value="General feedback" key="General feedback">
          General feedback
        </option>
        <option className="text-secondaryText" value="Bug report" key="Bug report">
          Bug report
        </option>
        <option className="text-secondaryText" value="Feature request" key="Feature request">
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
        className={`duration-200 text-secondaryText w-32 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-1 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
      >
        <option value="" key="" className="text-secondaryText">
          All
        </option>
        <option className="text-secondaryText" value="New" key="New">
          New
        </option>
        <option className="text-secondaryText" value="In progress" key="In progress">
          In progress
        </option>
        <option className="text-secondaryText" value="Resolved" key="Resolved">
          Resolved
        </option>
        <option className="text-secondaryText" value="Rejected" key="Rejected">
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

const generateStateIcon = (state: feedbackStateType) => {
  switch (state) {
    case 'New':
      return <BellSnoozeIcon className="h-5 w-5 text-zinc-400" />;
    case 'In progress':
      return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    case 'Resolved':
      return <CheckIcon className="h-5 w-5 text-green-500" />;
    case 'Rejected':
      return <XMarkIcon className="h-5 w-5 text-red-500" />;
    default:
      break;
  }
};

const generatePriorityIcon = (priority: feedbackPriorityType) => {
  switch (priority) {
    case 'Very low':
      return <ChevronDoubleDownIcon className="h-4 w-4 text-blue-500" />;
    case 'Low':
      return <ChevronDownIcon className="h-4 w-4 text-blue-500" />;
    case 'Medium':
      return <MinusIcon className="h-4 w-4 text-yellow-500" />;
    case 'High':
      return <ChevronUpIcon className="h-4 w-4 text-red-500" />;
    case 'Very high':
      return <ChevronDoubleUpIcon className="h-4 w-4 text-red-500" />;
    default:
      break;
  }
};
