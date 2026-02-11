// app/layout.js
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RealEstatePopup from '@/components/RealEstatePopup';

export const metadata = {
  title: "Vishwak Properties",
  description: "Real Estate Properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
              <RealEstatePopup />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
