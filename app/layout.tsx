import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
const SAR_LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
`.trim().replace(/\n/g, '').replace(/>\s*</g, '><');

export const metadata: Metadata = {
  title: {
    default: "SAR Assistant | Landslide Risk & Rescue",
    template: "%s | SAR Assistant",
  },
  description: "AI-powered assistant for Search & Rescue operations and landslide risk assessment, providing real-time geographical analysis.",
  applicationName: "SAR Assistant",
  icons: {
    icon: `data:image/svg+xml,${encodeURIComponent(SAR_LOGO_SVG)}`,
    shortcut: `data:image/svg+xml,${encodeURIComponent(SAR_LOGO_SVG)}`,
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}