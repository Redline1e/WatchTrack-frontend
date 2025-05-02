import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";

export const metadata = {
  title: "My LR2 Tracker",
  description: "Track films, series & anime",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
