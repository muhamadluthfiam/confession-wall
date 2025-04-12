import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import { Providers } from './providers'

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
export const metadata = {
  title: {
    template: "%s / Cofession Wall",
    default: "Welcome / Cofession Wall",
  },
  description:
    "Everyone has something they wish they could say — now you can. Drop your anonymous confession and let your voice be heard, without fear or judgment. Be real. Be honest. Be free. 💬 Ready to confess? Your message lives on the blockchain, unfiltered and uncensored.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Providers>
          <Header />
          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}