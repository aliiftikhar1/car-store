'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '@/store/store';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if the current route is under `/Admin`
  const isAdmin = pathname.startsWith('/Admin') || pathname.startsWith('/Seller');

  if (isAdmin) {
    return (
      <html lang="en">
        <body className="bg-white">
          <div>{children}</div>
          <Toaster position="bottom-right"  />
        </body>
      </html>
    );
  }

  // Default layout with TopBar, Header, and Footer
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
      <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right"  />
        </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
