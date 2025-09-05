/* eslint-disable jsx-a11y/alt-text */
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";

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
            {/*  Google tag (gtag.js)  */}
            <Script
               src="https://www.googletagmanager.com/gtag/js?id=G-8YNM25L12S"
               strategy="afterInteractive"
               async
            />

            <Script
               id="google-analytics"
               strategy="afterInteractive"
               dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-8YNM25L12S');
            `,
               }}
            />

            {/* tag manager */}
            <Script id="google-tag-manager" strategy="afterInteractive">
               {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WR3NXFXB');
          `}
            </Script>

            {/* Microsoft Clarity */}
            <Script
               id="microsoft-clarity"
               strategy="afterInteractive"
               dangerouslySetInnerHTML={{
                  __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "t17qkhrrzm");
            `,
               }}
            />
            
            {/* Meta Pixel */}
            <Script id="meta-pixel" strategy="afterInteractive">
               {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '730679939958390'); 
                  fbq('track', 'PageView');
               `}
            </Script>
            <noscript>
               <img
                  height="1"
                  width="1"
                  style={{ display: "none" }}
                  src="https://www.facebook.com/tr?id=730679939958390&ev=PageView&noscript=1"
               />
            </noscript>

         </head>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ClientLayout>
               {children}
            </ClientLayout>
         </body>
      </html>
   );
}
