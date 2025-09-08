import { ChooseATheme } from "@/components/choose-theme"
import { FormUploadUserIcon } from "@/components/forms/form-upload-user-icon"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stock App | Configurações",
}

export default function UploadPage() {
  return (
    <main className="h-container flex items-center justify-center p-8">
      <Card className={cn(
        "w-full justify-between border-primary",
        "lg:w-full",
        "xl:w-1/3",
        "lg:w-2/3"
      )}>
        <CardHeader>
          <CardTitle className="text-lg truncate">Configurações</CardTitle>
          <CardDescription>
            Altere as configurações padrões do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="size-full flex flex-col gap-2">
          <FormUploadUserIcon
            isTitle
            className="w-full bg-transparent shadow-none"
          />
          <Card className="w-full h-max">
            <CardHeader>
              <CardTitle className="text-lg truncate">Escolha o tema</CardTitle>
            </CardHeader>
            <CardContent>
              <ChooseATheme />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  )
}
