import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

interface ColumnConfig {
  header: { width: string };
  cell: { width: string };
}

interface SkeletonTableProps {
  columns: ColumnConfig[];
  rows: number;
  showFilter?: boolean;
  showPagination?: boolean;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  columns,
  rows,
  showFilter = true,
  showPagination = true,
}) => {
  return (
    <div className="container mx-auto py-10">
      {showFilter && (
        <div className="flex items-center py-4">
          <Skeleton className="h-6 w-[350px]" />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.header.width}>
                  <Skeleton className="h-10 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(rows)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.cell.width}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-[80px]" />
        </div>
      )}
    </div>
  );
};

export { SkeletonTable };