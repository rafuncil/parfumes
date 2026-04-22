import type { Metadata } from "next";
import "@/styles/index.scss";
import { AppProviders } from "@/providers";
// import { fonts } from "@/scripts/fonts";
import { Toaster } from 'sonner'


export const metadata: Metadata = {
  title: "Cube-Parfumes",
  description: "Самые бомбовые духи Нальчика",
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
        <link rel="icon" type="image/svg" href="/images/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
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
