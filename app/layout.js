import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPA Calculator",
  description: "Now easier to determine your GPA!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-K6PXKLVXMT"
      />
      <script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-K6PXKLVXMT');
        `}
      </script>
      </head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
