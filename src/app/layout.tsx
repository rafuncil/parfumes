import type { Metadata } from "next";
import "@/styles/index.scss";
import { AppProviders } from "@/providers";
// import { fonts } from "@/scripts/fonts";
import { Toaster } from 'sonner'


export const metadata: Metadata = {
  title: "NajmLabs | Cтудия разработки IT-продуктов",
  description: "Разработка корпоративных сайтов, бизнес-приложений, создание игровых проектов и профессиональный дизайн.",
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
