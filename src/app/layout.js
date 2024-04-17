import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { MemberProvider } from "@/components/ContextProvider";
import { ThemeProvider } from "@/components/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rotary Club",
  description: "Rotary Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <MemberProvider>
        {children}
        <Toaster richColors position="top-right"/>
        </MemberProvider>    
      </ThemeProvider>
      </body>
    </html>
  );
}
