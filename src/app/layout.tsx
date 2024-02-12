import type { Metadata } from 'next'
import { Raleway as FontSans, Kdam_Thmor_Pro as Kdam } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const fontKdam = Kdam({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-kdam',
})
export const metadata: Metadata = {
  title: 'AIDiets',
  description: 'Faça sua dieta personalizada e inteligente',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={fontKdam.variable}>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
