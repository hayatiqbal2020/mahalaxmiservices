import Script from "next/script";
import { site } from "@/lib/site";

// Google Analytics. Loads only when NEXT_PUBLIC_GA_ID is set, and only after
// the page is interactive, so it does not slow the first paint.
export default function Analytics() {
  if (!site.gaId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
      </Script>
    </>
  );
}
