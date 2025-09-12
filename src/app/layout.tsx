import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Products",
  description: "Genera cotizaciones y envíos de productos por marca",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased min-h-dvh bg-background text-foreground`}>
        {children}
        {/* En móvil ubicamos abajo para no tapar el Sheet del carrito */}
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
