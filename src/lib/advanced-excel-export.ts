import { utils, writeFile, CellObject } from "xlsx"

export interface ColumnDefinition {
  key: string
  header: string
  width?: number
  style?: CellObject & { s?: any }
}

export async function exportFormattedExcel<T extends Record<string, any>>(
  data: T[],
  columns: ColumnDefinition[],
  options: {
    fileName: string
    sheetName?: string
  }
) {
  // Estilo padrão do cabeçalho
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4472C4" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  }

  // Cabeçalho
  const headers = columns.map(col => ({
    v: col.header,
    t: "s",
    s: headerStyle,
  }))

  // Linhas de dados
  const rows = data.map(item =>
    columns.map(col => ({
      v: item[col.key] ?? "",
      t: typeof item[col.key] === "number" ? "n" : "s",
      s: col.style || {},
    }))
  )

  // Monta a planilha
  const worksheet = utils.aoa_to_sheet([headers, ...rows])

  // Largura automática das colunas
  worksheet["!cols"] = columns.map((col, i) => {
    const maxContentLength = Math.max(
      col.header.length,
      ...data.map(item => String(item[col.key] ?? "").length)
    )
    return { width: col.width || maxContentLength + 2 } // +2 para espaçamento
  })

  // Cria e salva o arquivo
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, options.sheetName || "Sheet1")

  await writeFile(workbook, `${options.fileName}.xlsx`)
}
