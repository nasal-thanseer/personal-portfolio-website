import { Link } from "wouter";
import { Instagram, Twitter, Dribbble, Linkedin } from "lucide-react";

const socialLinks = [
  { 
    icon: Instagram, 
    href: "https://instagram.com/", 
    label: "Instagram" 
  },
  { 
    icon: Twitter, 
    href: "https://twitter.com/", 
    label: "Twitter" 
  },
  { 
    icon: Dribbble, 
    href: "https://dribbble.com/", 
    label: "Dribbble" 
  },
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/", 
    label: "LinkedIn" 
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-background border-t border-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link 
              href="/"
              className="text-xl font-semibold"
            >
              STUDIO
            </Link>
            <p className="text-sm text-muted mt-2">© {currentYear} Creative Studio. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map(social => (
              <a 
                key={social.label}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-accent transition-colors duration-200"
                aria-label={social.label}
              >
                <span className="sr-only">{social.label}</span>
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
