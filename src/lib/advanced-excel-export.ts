import { utils, writeFile, CellObject } from "xlsx"

export interface ColumnDefinition {
    key: string
    header: string
    width?: number
    style?: CellObject
}

export function exportFormattedExcel(
    data: any[],
    columns: ColumnDefinition[],
    options: {
        fileName: string
        sheetName?: string
    }
) {

    const headers = columns.map(col => ({
        v: col.header,
        t: "s",
        s: {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4472C4" } },
            alignment: { horizontal: "center" }
        }
    }))

    const rows = data.map(item =>
        columns.map(col => ({
            v: item[col.key],
            t: typeof item[col.key] === "number" ? "n" : "s",
            s: col.style
        }))
    )

    const worksheet = utils.aoa_to_sheet([headers, ...rows])


    worksheet["!cols"] = columns.map(col => ({
        width: col.width || 20  
    }))

    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, options.sheetName || "Sheet1")

    writeFile(workbook, `${options.fileName}.xlsx`)
}