import { exportToExcel } from "@/lib/excel-export"
import { cn } from "@/lib/utils"

interface ExcelExportButtonProps {
    data: any[]
    fileName: string
    className?: string
    children: React.ReactNode
}

export default function ExcelExportButton({
    data,
    fileName,
    className,
    children
}: ExcelExportButtonProps) {

    const handleExport = () => {
        exportToExcel(data, {
            fileName,
            sheetName: 'Data',
            headerStyle: {
                font: { bold: true },
                fill: { fgColor: { rgb: "FFFFAA00" } }
            }
        })
    }

    return (
        <button
            onClick={handleExport}
            className={cn("px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700", className)}
        >
            {children}
        </button>
    )
}