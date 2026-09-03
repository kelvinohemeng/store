"use client";

import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSelectedOrder, useSlide } from "@/store";
import { OrderItem } from "@/lib/types";
import DisplayOrderSlide from "./DisplayOrderSlide";
import { useOrderStore } from "@/store/orders";
import { CaretLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { setState } = useSlide();
  const { selectedOrder, setSelectedOrder } = useSelectedOrder();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    //filtering
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      columnFilters,
    },
  });

  const handleRowClick = (row: OrderItem | TData) => {
    //@ts-ignore
    setSelectedOrder(row);
    setState("view-order");
    console.log(row);
  };

  useEffect(() => {
    console.log(data);
  }, []);

  // Add this function before the return statement
  const shouldCellBeNonClickable = (cell: Cell<TData, unknown>): boolean => {
    // For example, to disable clicking on cells in a specific column:
    if (
      cell.column.id === "order_status_admin" ||
      cell.column.id.includes("status")
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div>
        <div className="flex items-center py-4">
          <div className="relative max-w-sm w-full">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <Input
              placeholder="Search by email"
              value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="pl-9"
            />
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
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
                              header.getContext()
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
                    onClick={() => handleRowClick(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      // Check if this cell should be non-clickable
                      const isNonClickableCell = shouldCellBeNonClickable(cell);

                      return (
                        <TableCell
                          key={`${row.id}-${cell.id}`}
                          onClick={
                            isNonClickableCell
                              ? (e) => e.stopPropagation()
                              : undefined
                          }
                          className={isNonClickableCell ? "cursor-default" : ""}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    key={`No Data Yet`}
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
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-neutral-500">
            {table.getFilteredRowModel().rows.length} order
            {table.getFilteredRowModel().rows.length === 1 ? "" : "s"}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <CaretLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <CaretRight size={16} />
            </Button>
          </div>
        </div>
      </div>
      <DisplayOrderSlide order={selectedOrder} />
    </>
  );
}
