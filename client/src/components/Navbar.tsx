import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/play", label: "Play" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 bg-background transition-shadow ${
      isScrolled ? "shadow-sm" : ""
    }`}>
      <div className="px-6">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-2xl font-semibold tracking-tight">
              <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>STUDIO</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition-colors duration-200 ${
                  location === link.href 
                    ? "text-accent" 
                    : "text-primary hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden focus:outline-none" 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        <div className={`md:hidden py-4 space-y-2 ${isMenuOpen ? "block" : "hidden"}`}>
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`block py-2 ${
                location === link.href 
                  ? "text-accent" 
                  : "text-primary hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
