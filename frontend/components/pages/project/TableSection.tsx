import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { flexRender, Table } from '@tanstack/react-table';

export const TableSection = ({ table }: { table: Table<any> }) => {
  return (
    <table className="w-full">
      <thead className="border-b-2 border-3Background text-muted text-sm">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan} className="font-normal text-left py-4 px-3">
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                        className='flex space-x-2 items-center'
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{  
                          asc: <ChevronUpIcon className=" h-4 w-5" aria-hidden="true"/>,
                          desc: <ChevronDownIcon className=" h-4 w-5" aria-hidden="true" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="divide-3Background divide-y">
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="hover:bg-main duration-200 hover:text-mainText">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} className="py-4 px-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
