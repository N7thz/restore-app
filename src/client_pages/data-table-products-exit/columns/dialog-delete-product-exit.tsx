import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteProductExit } from "@/hooks/use-delete-product-exit"
import { cn } from "@/lib/utils"
import { Loader2, Trash, Undo2, X } from "lucide-react"

export const DialogDeleteProductExit = ({
  id,
  setOpen,
}: {
  id: string
  setOpen: (open: boolean) => void
}) => {
  const { mutate, isPending } = useDeleteProductExit(id, setOpen)

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn([
          "w-full hover:bg-accent",
          "dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive",
        ])}
      >
        <Trash />
        Excluir
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            A exclusão de uma saida não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Undo2 className="group-hover:-translate-x-0.5 duration-200" />
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="size-full flex items-center gap-2 group">
                <X className="group-hover:rotate-90 duration-200" />
                Confirmar
              </span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
