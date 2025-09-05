"use client"

import {
    DataTablePagination
} from "@/components/data-table/data-table-column-pagination"
import { DialogExportData } from "@/components/dialog-export-data"
import { FormExportProdctsExit } from "@/components/forms/form-export-prodcts-exit"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
}

type VisibilityState = {
    description?: boolean
    quantity?: boolean
    createdAt?: boolean
    region?: boolean
    username?: boolean
}

export function DataTableExit<TData, TValue>({
    columns,
    data,
    isLoading = false
}: DataTableProps<TData, TValue>) {

    const [open, setOpen] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [
        columnVisibility, setColumnVisibility
    ] = useState<VisibilityState>({
        description: false,
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <Card className="w-full border-primary gap-0">
            <CardHeader>
                <CardTitle>
                    Saida de produtos
                </CardTitle>
                <CardDescription>
                    Acompanhe a saida de produtos do estoque
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Pesquise um produto..."
                        value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("username")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <div className="ml-auto flex gap-2">
                        <DialogExportData
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <FormExportProdctsExit setOpen={setOpen} />
                        </DialogExportData>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="ml-auto"
                                >
                                    Colunas
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {
                                    table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <DataTablePagination table={table} />
                <ScrollArea className="h-[460px]">
                    <ScrollBar />
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                {
                                    table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {
                                                    headerGroup.headers.map((header) => (
                                                        <TableHead key={header.id}>
                                                            {
                                                                header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )
                                                            }
                                                        </TableHead>
                                                    ))
                                                }
                                            </TableRow>
                                        ))
                                }
                            </TableHeader>
                            <TableBody>
                                {
                                    table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center text-base"
                                            >
                                                {
                                                    isLoading
                                                        ? "Carregando dados..."
                                                        : "Sem resultados."
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}