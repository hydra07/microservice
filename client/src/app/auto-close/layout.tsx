// app/auto-close/layout.tsx
import StoreProvider from '../StoreProvider';

export default function AutoCloseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}