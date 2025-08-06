import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "React Developer Assignment",
  description: "Assignment completed by Md. Nafis Tarik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`antialiased min-h-full transition-base`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
