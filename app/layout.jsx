import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import QuoteModalProvider from "@/components/revamp/QuoteModalProvider";
import SiteFooter from "@/components/revamp/SiteFooter";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata = {
  title: "Milimani Events & Lifestyle Hub",
  description: "Premium event experiences, tenting solutions, logistics, and lifestyle services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="top" className={`${manrope.variable} ${cormorant.variable} bg-smoke text-ink`}>
        <QuoteModalProvider>
          {children}
          <SiteFooter />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
