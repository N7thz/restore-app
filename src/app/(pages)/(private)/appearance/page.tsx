import { ChooseATheme } from "@/components/choose-theme"
import { FormUpdateUser } from "@/components/forms/form-update-user"
import { FormUploadUserIcon } from "@/components/forms/form-upload-user-icon"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configurações | Stock App",
}

export default function UploadPage() {
  return (
    <main className="h-container flex items-center justify-center p-8">
      <Card className={cn(
        "w-full justify-between border-primary",
        "lg:w-full",
        "xl:w-2/3",
        "lg:w-2/3"
      )}>
        <CardHeader>
          <CardTitle>
            Configurações
          </CardTitle>
          <CardDescription>
            Altere as configurações padrões do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="size-full flex gap-2">
          <FormUploadUserIcon
            isTitle
            className="w-1/2 bg-transparent shadow-none"
          />
          <div className="w-1/2 flex flex-col justify-between gap-2">
            <FormUpdateUser />
            <Card className="w-full h-max">
              <CardHeader>
                <CardTitle className="text-lg truncate">
                  Escolha o tema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChooseATheme />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
