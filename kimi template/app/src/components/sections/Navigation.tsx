import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onDemoClick: () => void;
}

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Secteurs', href: '#sectors' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation({ onDemoClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2 px-4 md:px-8'
            : 'py-4 px-4 md:px-8'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? 'max-w-6xl frosted-glass rounded-2xl shadow-lg px-4 md:px-6 py-2'
              : 'max-w-7xl px-2 md:px-4 py-2'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2"
            >
              <img
                src={isScrolled ? '/images/logo_color.png' : '/images/logo_white.png'}
                alt="Amptech Inc"
                className="h-14 md:h-18 w-auto object-contain"
                style={{ maxHeight: '70px' }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium magnetic-text hover:text-primary transition-colors ${
                    isScrolled ? 'text-amptech-gray-dark' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:418-748-7613"
                className={`flex items-center gap-2 text-sm font-medium ${
                  isScrolled ? 'text-amptech-gray-dark' : 'text-white/90'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>418-748-7613</span>
              </a>
              <Button
                onClick={onDemoClick}
                className="gradient-blue text-white hover:opacity-90 rounded-full px-6 electric-fill"
              >
                Demander un devis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-amptech-dark' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-amptech-dark/95 backdrop-blur-lg" />
        <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
          <img
            src="/images/logo_white.png"
            alt="Amptech Inc"
            className="h-20 w-auto object-contain mb-8"
            style={{ maxHeight: '100px' }}
          />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-xl font-medium text-white/90 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={onDemoClick}
            className="mt-8 gradient-blue text-white hover:opacity-90 rounded-full px-8 py-3"
          >
            Demander un devis
          </Button>
          <a
            href="tel:418-748-7613"
            className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>418-748-7613</span>
          </a>
        </div>
      </div>
    </>
  );
}
