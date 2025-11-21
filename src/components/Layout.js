import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vishwak Properties - Premium Real Estate in Chennai',
  description: 'Your trusted real estate partner in Chennai.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-[100px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}