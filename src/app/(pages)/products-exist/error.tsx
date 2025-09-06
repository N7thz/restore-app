"use client"

import { columns } from "@/client_pages/data-table-products/columns"
import {
    DataTablePagination
} from "@/components/data-table/data-table-column-pagination"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
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
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import { useEffect } from "react"

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {

    useEffect(() => window.location.reload(), [])

    useEffect(() => console.log(error), [error])

    const table = useReactTable({
        data: [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <main className="h-container flex items-center justify-center p-8">
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
                            className="max-w-sm"
                        />
                        <Button
                            variant="outline"
                            className="ml-auto"
                        >
                            Colunas
                        </Button>
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
                                                    className="w-full h-24 text-center text-base"
                                                >
                                                    Carregando dados...
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </main>
    )
}