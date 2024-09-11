import theme from "@/app/components/theme";
import { A } from "@/app/components/ui/anchor";
import { ubuntu } from "@/app/components/ui/fonts";
import "@/app/globals.css";
import { ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import 'overlayscrollbars/overlayscrollbars.css';

export const metadata: Metadata = {
  title: "DFCalc",
  description: "Calculator tool for Delta Force by antD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col items-center w-full max-w-screen min-h-screen bg-[url('imgs/background.png')] bg-cover bg-center bg-fixed ${ubuntu.className} text-white`}>
        <ThemeProvider theme={theme}>
          <main className="flex-grow w-full flex flex-col items-center max-w-screen-lg">
            {children}
          </main>
          <footer className="self-center justify-self-end flex gap-x-4 pt-4">
            <A href="issues" className="no-underline text-white/50 hover:text-white hover:no-underline">Issues</A>
            <A href="contribute" className="no-underline text-white/50 hover:text-white hover:no-underline">Contribute</A>
            <A href="https://github.com/antD97/DFCalc" className="no-underline text-white/50 hover:text-white hover:no-underline">Source</A>
            <A href="https://github.com/sponsors/antD97" className="no-underline text-white/50 hover:text-white hover:no-underline">Donate</A>
            <A href="legal" className="no-underline text-white/50 hover:text-white hover:no-underline">Legal</A>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
