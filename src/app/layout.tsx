import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const jetBrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "stock App",
  description: "A Next.js application for restoring lost data",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ptBR"
      suppressHydrationWarning
    >
      <head />
      <body className={cn(jetBrains.variable, "antialiased max-h-dvh")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          <ScrollArea className="h-[calc(100dvh_-_72px)] w-full flex">
            <ScrollBar />
            <div className="h-[calc(100dvh_-_72px)] flex">
              {children}
            </div>
          </ScrollArea>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
