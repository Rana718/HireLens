import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme.provider";
import { dark } from "@clerk/themes";
import { config } from "@/config/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "AI Career Coach",
   description:
      "Your personalized AI-powered career coach to help you land your dream job.",
   keywords: [
      "AI Career Coach",
      "Job Search",
      "Resume Builder",
      "Mock Interviews",
      "Career Guidance",
      "Interview Preparation",
   ],
   icons: {
      icon: "/logotop.ico"
   }
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <ClerkProvider appearance={{ baseTheme: dark }}>
         <html lang="en" suppressHydrationWarning>
            <head>
               <script defer src="https://cloud.umami.is/script.js" data-website-id={config.WEBSITE_ID}></script>
            </head>
            <body className={inter.className}>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem
                  disableTransitionOnChange
               >
                  <Header />
                  <main className="min-h-screen">{children}</main>
                  <Toaster richColors />
               </ThemeProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
