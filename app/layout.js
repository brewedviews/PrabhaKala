import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata = {
  title: 'Prabha Kala — Handcrafted Banarasi Silk Sarees',
  description: 'Discover authentic handwoven Banarasi Silk Sarees from Varanasi. Every thread tells a story of tradition, craftsmanship and timeless elegance.',
  keywords: 'banarasi silk saree, indian saree, bridal saree, wedding saree, handloom, varanasi silk',
  openGraph: {
    title: 'Prabha Kala — Every Thread Tells a Story',
    description: 'Handcrafted Banarasi Silk Sarees. Heirloom quality. Timeless elegance.',
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
