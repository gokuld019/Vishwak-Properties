import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from "sonner";

export const metadata = {
  title: 'Vishwak Properties',
  description: 'Real Estate Properties',
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
