import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { getCategories } from "./services/categoryService";
import { CategoryReponse } from "./types/category";
import { getNationals } from "./services/nationalService";
import { NationalReponse } from "./types/national";
import BgDecoration from "./components/BgDecoration";
import Header from "./components/Header";
import RootProvider from "./providers/RootProvider";
import ProgressBarProvider from "./providers/ProgressBarProvider";
import Footer from "./components/Footer";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoryReponse, nationalReponse] = await Promise.all([
    getCategories<CategoryReponse>(),
    getNationals<NationalReponse>(),
  ]);

  const categories = categoryReponse.items;
  const nationals = nationalReponse.items;

  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressBarProvider>
          <ThemeProvider>
            <BgDecoration />
            <Header categories={categories} nationals={nationals} />
            <RootProvider categories={categories} nationals={nationals}>
              {children}
            </RootProvider>
            <Footer />
          </ThemeProvider>
        </ProgressBarProvider>
        <GoogleAnalytics gaId="G-4T9R83ZFLW" />
        <GoogleTagManager gtmId="GTM-PZGWJW9T" />
      </body>
    </html>
  );
}
