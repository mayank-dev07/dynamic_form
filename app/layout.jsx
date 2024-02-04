import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full"> {children}</body>
    </html>
  );
}
