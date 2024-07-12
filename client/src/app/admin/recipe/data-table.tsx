import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const totalPages = table.getPageCount();
  return (
    <div>
      <div className="flex items-center py-4">
        <SelectColumnFilter table={table} />
      </div>
      <div className="rounded-md border h-fit">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, page) => (
          <Button
            key={page}
            variant={
              table.getState().pagination.pageIndex === page
                ? "secondary"
                : ("default" as const)
            }
            size="sm"
            onClick={() => table.setPageIndex(page)}
          >
            {page + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function SelectColumnFilter({ table }: any) {
  const [column, setColumn] = useState<string>("title");
  return (
    <div className="flex flex-row space-x-2">
      <Select
        onValueChange={(value) => {
          setColumn(value);
        }}
        defaultValue="title"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select column to filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          {/* <SelectItem value="createdAt">Date</SelectItem>
          <SelectItem value="user">Author</SelectItem>
          <SelectItem value="isActivate">Published</SelectItem> */}
        </SelectContent>
      </Select>
      <Input
        placeholder={`Filter post by ${column}...`}
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(column)?.setFilterValue(event.target.value)
        }
        className="max-w-md w-full"
      />
    </div>
  );
}
