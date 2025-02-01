import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: './fonts/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: "Book Me",
  description: "A hotel booking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.variable}
      >
        {children}
      </body>
    </html>
  );
}
