import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic Tac Toe | React Developer Assignment",
  description: "A beautiful Tic Tac Toe game created by Md. Nafis Tarik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`antialiased min-h-full transition-base`}>
        {children}
      </body>
    </html>
  );
}