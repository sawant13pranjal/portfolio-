import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-serif' 
})

export const metadata: Metadata = {
  title: 'Pranjal Sawant | UI/UX Designer',
  description: 'Portfolio of Pranjal Sawant — UI/UX Designer crafting intuitive digital experiences with Figma, Webflow & Framer.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/My NAME LGO.png',
        type: 'image/png',
      },
    ],
    apple: '/My NAME LGO.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2dd4bf',
  width: 'device-width',
  initialScale: 1,
}

import { ThemeProvider } from '@/components/theme-provider'
import FloatingContact from '@/components/floating-contact'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <FloatingContact />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
