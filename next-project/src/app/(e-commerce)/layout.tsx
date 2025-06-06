import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ThemeProvider } from "../../components/theme-provider"
import Announcements from "../../components/Announcements";

const getPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Covertron",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head />
      <body
        className={`${getPoppins.variable} antialiased flex flex-col min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-grow pt-[5.75rem] w-full">
            <div className="max-w-6xl mx-auto">
              <Navbar />
            </div>
            <div className="max-w-8xl mx-auto">
              <Announcements />
            </div>
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </ThemeProvider>
        <Footer />
      </body>
    </html >
  );
}
