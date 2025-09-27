import { Table } from "@tanstack/react-table"
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div
			className={cn(
				"flex items-center justify-between px-2 my-4",
				"max-sm:flex-col max-sm:my-0"
			)}>
			<div
				className={cn(
					"w-3/4 flex items-center space-x-6 lg:space-x-8",
					"max-sm:w-full max-sm:flex-col max-sm:items-end max-sm:gap-2 max-sm:space-x-0"
				)}>
				<div
					className={cn(
						"flex items-center space-x-2",
						"max-sm:space-x-0 max-sm:gap-2"
					)}>
					<Button
						variant="outline"
						size="icon"
						className="hidden size-8 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="hidden size-8 lg:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
				<div
					className={cn(
						"flex items-center space-x-2",
						"max-sm:w-full max-sm:justify-between"
					)}>
					<p className="text-sm font-medium">Linhas por página</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
						}}>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="bottom">
							{[10, 25, 30, 40, 50, 100].map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div
					className={cn(
						"flex w-[100px] items-center justify-center text-sm font-semibold",
						"max-sm:w-full max-sm:justify-start"
					)}>
					<span className="mr-2 font-medium">Pagina</span>
					{table.getState().pagination.pageIndex + 1}
					<span className="mx-1.5 font-medium">de</span>
					{table.getPageCount()}
				</div>
			</div>
			<div
				className={cn(
					"flex-1 w-1/4 text-muted-foreground text-center text-sm",
					"max-sm:w-full max-sm:my-4 max-sm:text-end"
				)}>
				{table.getFilteredSelectedRowModel().rows.length} de{" "}
				{table.getFilteredRowModel().rows.length} linha(s) selecionadas
			</div>
		</div>
	)
}
