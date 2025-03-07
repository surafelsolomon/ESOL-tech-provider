import Header from './components/Header';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
