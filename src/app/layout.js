import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL("https://vishwakproperties.in"),

  title: "Vishwak Properties | Premium Real Estate Developers in South India",
  description: "Vishwak Properties is a trusted real estate developer delivering premium residential and commercial projects with quality, transparency and trust.",

  openGraph: {
    title: "Vishwak Properties | Premium Real Estate Developers in South India",
    description: "Vishwak Properties is a trusted real estate developer delivering premium residential and commercial projects with quality, transparency and trust.",
    url: "https://vishwakproperties.in",
    siteName: "Vishwak Properties",
    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "/whatsapp.jpeg", 
        width: 1200,
        height: 630,
        alt: "Vishwak Properties",
      },
    ],
  },

 twitter: {
  card: "summary_large_image",
  title: "Vishwak Properties | Premium Real Estate Developers in South India",
  description:
    "Vishwak Properties is a trusted real estate developer delivering premium residential and commercial projects with quality, transparency and trust.",
  images: ["/whatsapp.jpeg"],
},

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster
          position="top-center"
          richColors
          closeButton
          expand
        />
      </body>
    </html>
  );
}