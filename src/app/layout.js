'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if the current route is under `/Admin`
  const isAdmin = pathname.startsWith('/Admin');

  if (isAdmin) {
    return (
      <html lang="en">
        <body className="bg-white">
          <div>{children}</div>
        </body>
      </html>
    );
  }

  // Default layout with TopBar, Header, and Footer
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
