import type { Metadata } from "next";
import "@/styles/index.scss";
import { AppProviders } from "@/providers";
// import { fonts } from "@/scripts/fonts";
import { Toaster } from 'sonner'


export const metadata: Metadata = {
  title: "Maison A.",
  description: "Оригинальный парфюм по лучшим ценам",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    {/* <html lang="ru" className={fonts.join(' ')}> */}
    <html lang="ru">
      <head>
        <link rel="icon" href="/images/icon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <AppProviders>
          {children}
          <div id="modals" />
          <Toaster position="top-right" richColors />
        </AppProviders>
      </body>
    </html>
  </>);
}
