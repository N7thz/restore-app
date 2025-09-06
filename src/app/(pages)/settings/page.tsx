"use client"

import ExcelExportButton from '@/components/excel-export-button';
import { exportFormattedExcel } from '@/lib/advanced-excel-export';
import { findProducts } from '@/actions/products/find-products';
import { CellObject } from 'xlsx';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { allColumns } from '@/data/all-columns-products';
import { format } from 'path';
import { formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export interface ColumnDefinition {
    key: string
    header: string
    width?: number
    style?: CellObject
}

export default function UsersPage() {

    const { data } = useQuery({
        queryKey: ["kfseçlfks"],
        queryFn: () => findProducts()
    })

    if (!data) {
        return (
            <div>
                Carregando...
            </div>
        )
    }

    const { products } = data

    const handleAdvancedExport = () => {
        exportFormattedExcel(products, allColumns, {
            fileName: 'produtos_exportados',
            sheetName: 'produtos',
        })
    }

    return (
        <div className="p-6">
            <div className="flex gap-4 mb-6">
                <ExcelExportButton
                    data={products}
                    fileName="usuarios"
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Exportar Simples
                </ExcelExportButton>

                <Button
                    variant={"outline"}
                    className={cn("dark:hover:bg-emerald-600")}
                    onClick={handleAdvancedExport}
                >
                    <Download className="group-hover:-translate-y-0.5 duration-200" />
                    Exportar dados
                </Button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Nome</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Cargo</th>
                        <th className="border border-gray-300 p-2">Data Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(user => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 p-2">
                                {user.name}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {user.description}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {user.quantity}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {user.minQuantity}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}