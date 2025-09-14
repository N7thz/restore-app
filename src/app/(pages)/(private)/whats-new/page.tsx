import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Novidades | Stock App",
}

export default function WhatsNew() {
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
                        Atualizações e novidades
                    </CardTitle>
                    <CardDescription>
                        Fique por dentro do que a de novo
                    </CardDescription>
                </CardHeader>
                <ScrollArea className="h-[500px] overflow-hidden">
                    <ScrollBar />
                    <CardContent className="size-full space-y-4">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    Login e Cadastro Implementados
                                </CardTitle>
                                <CardDescription>
                                    adicionado em:  {formatDate(new Date("09/12/2025"), "P", { locale: ptBR })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-lg">
                                Temos o prazer de anunciar uma importante atualização em nosso sistema! Foram implementadas as páginas de Login e Cadastro. <br />

                                Agora, os usuários podem criar uma conta personalizada para acessar o sistema com segurança, salvando suas preferências e histórico.
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    Agora somos um PWA!
                                </CardTitle>
                                <CardDescription>
                                    adicionado em:  {formatDate(new Date("09/13/2025"), "P", { locale: ptBR })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-lg">
                                Sua experiência acaba de ficar ainda melhor! Nosso site agora é um PWA (Progressive Web App). <br />

                                Isso significa que você pode instalá-lo diretamente na tela inicial do seu celular ou computador, como um aplicativo nativo. Aproveite para acessar rapidamente, receber notificações e ter uma experiência offline ainda mais fluida e rápida.

                                Tudo isso sem precisar baixar nada na loja de aplicativos. Mais praticidade e performance no seu dia a dia.

                                Atualize o site no seu navegador e experimente!
                            </CardContent>
                        </Card>
                    </CardContent>
                </ScrollArea>
            </Card>
        </main>
    )
}