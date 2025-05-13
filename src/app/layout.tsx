import Navigation from "@/components/navigation/Navigation";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 ">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
