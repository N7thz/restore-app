"use client"

import { DataTablePagination } from "@/components/data-table/data-table-column-pagination"
import { DialogExportData } from "@/components/dialog-export-data"
import { FormExportProdcts } from "@/components/forms/form-export-prodcts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { flexRender } from "@tanstack/react-table"
import { Columns3, FileSpreadsheet } from "lucide-react"
import Link from "next/link"
import { DataTableProps, useDataTable } from "./use-data-table"
import { cn } from "@/lib/utils"

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const { table, open, setOpen } = useDataTable({ data, columns })

  return (
    <Card className={cn(
      "w-11/12 border-primary gap-0 absolute",
      "xl:w-2/3",
    )}>
      <CardHeader>
        <CardTitle>Produtos cadastrados</CardTitle>
        <CardDescription>
          Acompanhe todos os produtos cadastrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "flex items-center py-4",
          "max-sm:flex-col max-sm:gap-4"
        )}>
          <Input
            placeholder="Pesquise um produto..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={event =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant={"outline"}
                  className="hover:bg-primary dark:hover:bg-primary"
                >
                  <Link className="group" href={"/create-products-exit"}>
                    <FileSpreadsheet className="group-hover:-translate-y-0.5 duration-200" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Registrar saída de produto</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DialogExportData
                    open={open}
                    onOpenChange={setOpen}
                    disabled={table.getRowModel().rows?.length === 0}
                  >
                    <FormExportProdcts setOpen={setOpen} />
                  </DialogExportData>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-emerald-600">
                <p>Exportar dados</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        <Columns3 className="group-hover:-translate-y-0.5 duration-200" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter(column => column.getCanHide())
                        .map(column => (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={value =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Colunas</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <DataTablePagination table={table} />
        <ScrollArea className={cn(
          "h-[460px]",
          "max-sm:w-[400px]"
        )}>
          <ScrollBar
            orientation="horizontal"
            className="data-[orientation=vertical]:max-sm:translate-x-4"
          />
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
                      {isLoading ? "Carregando dados..." : "Sem resultados."}
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
