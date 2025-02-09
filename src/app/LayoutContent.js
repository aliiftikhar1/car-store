'use client';

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
import EndAuctionsChecker from './components/EndAuctionChecker';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/Admin') || pathname.startsWith('/Seller') || pathname.startsWith('/Login');

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <EndAuctionsChecker />
        {isAdmin ? (
          <div>{children}</div>
        ) : (
          <>
            <TopBar />
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
        <Toaster position="bottom-right" />
      </PersistGate>
    </Provider>
  );
}
