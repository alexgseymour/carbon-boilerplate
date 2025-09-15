import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./carbon.scss";
import { ThemeProvider } from "@/providers/ThemeProvider";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "cyrillic", "cyrillic-ext", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext", "latin-ext", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Carbon Design System Showcase",
  description:
    "A comprehensive showcase of Carbon Design System components with theme switching",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${plexSans.variable} ${plexMono.variable} antialiased cds--layout`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
