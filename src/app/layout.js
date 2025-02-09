import { Inter } from 'next/font/google';
import LayoutContent from './LayoutContent';

const inter = Inter({ subsets: ['latin'] });

// ✅ Metadata for Next.js
export const metadata = {
  title: "CarBuyDirect",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
