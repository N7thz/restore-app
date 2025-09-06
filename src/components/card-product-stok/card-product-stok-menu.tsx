import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Edit, Ellipsis } from "lucide-react"
import Link from "next/link"
import { DialogDeleteProduct } from "./dialog-delete-product"

export const CardProductStokMenu = ({ id }: { id: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size={"icon"}
                    variant={"ghost"}
                >
                    <Ellipsis className="group-hover:-translate-y-0.5 duration-200"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/update-product/${id}`}>
                        <Edit className="size-4" />
                        Editar
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <DialogDeleteProduct id={id} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
