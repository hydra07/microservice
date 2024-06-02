import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import StoreProvider from '../components/StoreProvider';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
const SessionWrapper = dynamic(() => import('@/components/SessionWrapper'), {
  ssr: false,
});
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <SessionWrapper>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {/* <Navbar /> */}
              <div className="pt-14">{children}</div>
            </ThemeProvider>
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
