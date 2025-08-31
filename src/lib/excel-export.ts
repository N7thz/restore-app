import { utils, writeFile } from "xlsx"

export interface ExportOptions {
    fileName: string
    sheetName?: string
    headerStyle?: any
    bodyStyle?: any
}

export function exportToExcel<T>(data: T[], options: ExportOptions) {

    const worksheet = utils.json_to_sheet(data)
    const workbook = utils.book_new()

    utils.book_append_sheet(workbook, worksheet, options.sheetName || "Sheet1")

    writeFile(workbook, `${options.fileName}.xlsx`)
}