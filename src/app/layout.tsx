import Navigation from "@/components/navigation/Navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
