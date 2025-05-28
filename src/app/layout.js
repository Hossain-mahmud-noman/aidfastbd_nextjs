import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import StoreProvider from './StoreProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AidFast",
  description:
    "AidFast অ্যাপ এর মাধ্যমে কাঙ্ক্ষিত ডাক্তার,ডায়াগনস্টিক সেন্টার, হাসপাতাল, ব্লাড ব্যাংক, ব্লাড ডোনার ও অ্যাম্বুলেন্সের তথ্য পেয়ে যান দ্রুত সময়ে | Developed by aidfastbd.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* HTML Meta Tags */}
        <title>AidFast</title>
        <meta name="description" content="AidFast অ্যাপ এর মাধ্যমে কাঙ্ক্ষিত ডাক্তার,ডায়াগনস্টিক সেন্টার, হাসপাতাল, ব্লাড ব্যাংক, ব্লাড ডোনার ও অ্যাম্বুলেন্সের তথ্য পেয়ে যান দ্রুত সময়ে | Developed by aidfastbd.com" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://aidfastbd.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AidFast" />
        <meta property="og:description" content="AidFast অ্যাপ এর মাধ্যমে কাঙ্ক্ষিত ডাক্তার,ডায়াগনস্টিক সেন্টার, হাসপাতাল, ব্লাড ব্যাংক, ব্লাড ডোনার ও অ্যাম্বুলেন্সের তথ্য পেয়ে যান দ্রুত সময়ে | Developed by aidfastbd.com" />
        <meta property="og:image" content="https://aidfastbd.com/og-image.jpg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="aidfastbd.com" />
        <meta property="twitter:url" content="https://aidfastbd.com" />
        <meta name="twitter:title" content="AidFast" />
        <meta name="twitter:description" content="AidFast অ্যাপ এর মাধ্যমে কাঙ্ক্ষিত ডাক্তার,ডায়াগনস্টিক সেন্টার, হাসপাতাল, ব্লাড ব্যাংক, ব্লাড ডোনার ও অ্যাম্বুলেন্সের তথ্য পেয়ে যান দ্রুত সময়ে | Developed by aidfastbd.com" />
        <meta name="twitter:image" content="https://aidfastbd.com/og-image.jpg" /> 

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KRKBFPTZ');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
