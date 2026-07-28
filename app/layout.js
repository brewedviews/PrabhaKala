import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata = {
  title: "Prabha Kala — Banarasi, Kanjivaram & Handloom Silk Sarees",
  description: "Handpicked from India's finest looms — Banarasi, Kanjivaram, Organza, and pure cotton sarees sourced directly from the artisans who weave them. Real silk, real zari, no middlemen.",
  keywords: 'banarasi silk saree, kanjivaram silk saree, organza saree, cotton saree, indian saree, bridal saree, wedding saree, handloom saree',
  openGraph: {
    title: "Prabha Kala — Handpicked from India's Finest Looms",
    description: 'Banarasi, Kanjivaram, Organza, Cotton — real silk, real zari, sourced direct from artisans across India.',
    type: 'website',
  },
};

const App = ({ children }) => {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-ivory text-brand-brown">
        <CartProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ style: { background: '#3A2418', color: '#FAF7F2', border: '1px solid #B8934B' } }} />
        </CartProvider>
      </body>
    </html>
  );
};

export default App;
