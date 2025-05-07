import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="top-bar w-full h-1 bg-accent"></div>
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center h-full border-r border-border px-5">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-8 h-8">
              <svg width="100%" height="auto" viewBox="0 0 338 338" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M253.023 142.008L241.738 137.111L122.772 131.003L111.45 120.257L219.438 95.8024L277.99 107.722L205.271 58.5L32 89.615L77.3921 236.281L143.848 279.5L125.261 223.715L200.366 234.609L252.839 190.64L306 191.703L253.023 142.008ZM151.79 190.186C142.011 190.186 134.075 182.26 134.075 172.484C134.075 162.708 142.011 154.776 151.79 154.776C161.569 154.776 169.504 162.702 169.504 172.484C169.504 182.266 161.569 190.186 151.79 190.186Z" fill="currentColor"/>
              </svg>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 h-full border-r border-border px-6 flex items-center">
          <div className="text-sm font-medium">NASAL.THANSEER.M.NOUFAL</div>
        </div>
        
        <nav className="hidden md:flex h-full">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`h-full flex items-center px-6 border-l border-border transition-colors duration-200 ${
                location === link.href 
                  ? "text-accent" 
                  : "text-primary hover:text-accent"
              }`}
            >
              <div className="text-sm">{link.label}</div>
            </Link>
          ))}
          
          <div className="h-full flex items-center px-6 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden h-full px-6 border-l border-border flex items-center justify-center focus:outline-none" 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className={`md:hidden border-t border-border ${isMenuOpen ? "block" : "hidden"}`}>
        {navLinks.map(link => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`block px-6 py-4 border-b border-border ${
              location === link.href 
                ? "text-accent" 
                : "text-primary hover:text-accent"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="px-6 py-4 border-b border-border">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}