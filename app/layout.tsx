import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Daka Marketing — Digital Marketing Agency in Ethiopia", template: "%s — Daka Marketing" },
  description: site.tagline,
  keywords: site.keywords,
  authors: [{ name: "Daka Marketing", url: site.url }],
  creator: "Daka Marketing",
  icons: { icon: "/brand/fan-mark.png" },
  openGraph: {
    title: "Daka Marketing",
    description: site.tagline,
    url: site.url,
    siteName: "Daka Marketing",
    locale: "en_US",
    type: "website",
    images: [{ url: "/brand/daka-logo-navy.png", width: 714, height: 447 }],
  },
  twitter: { card: "summary_large_image", title: "Daka Marketing", description: site.tagline, images: ["/brand/daka-logo-navy.png"] },
};

export const viewport: Viewport = {
  themeColor: "#06081a", // matches the always-dark hero
};

// Runs before paint so there is no flash of the wrong theme. Light unless the
// visitor picked dark with the toggle.
const themeScript = `(function(){try{var t=localStorage.getItem('daka-theme');if(t!=='light'&&t!=='dark'){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <a className="callbar" href={`tel:${site.phone}`}>
          <PhoneIcon /> {site.phoneDisplay}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
        </Script>
      </body>
    </html>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
