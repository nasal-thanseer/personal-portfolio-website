import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nasal-thanseer" },
  { label: "Email", href: "mailto:nasalthanseermn@gmail.com" },
  { label: "GitHub", href: "https://github.com/nasal-thanseer" },
  { label: "Phone", href: "tel:+971555956623" },
  { label: "Resume", href: "https://docs.google.com/document/d/1isEG9PDDgrPLgwi3hyaDZcAw-BZQC9nF3Hwhe_rJ2rA/edit?usp=sharing" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Column 1: Contact & Newsletter */}
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-border">
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <p className="text-sm text-muted mb-8">
            Looking for a fullstack developer with AR/VR expertise? I'm available for collaborations
            and project-based work.
          </p>
          
          <div className="mb-10">
            <a href="mailto:nasalthanseermn@gmail.com" className="text-accent inline-flex items-center group">
              nasalthanseermn@gmail.com
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          
          <div className="border-t border-border pt-8">
            <h4 className="text-sm font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-muted mb-4">
              Stay updated with my latest work and insights.
            </p>
            <div className="flex items-center border-b border-border pb-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-sm flex-1"
              />
              <button className="text-accent hover:text-accent/70 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Column 2: Social Links */}
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-border">
          <h3 className="text-lg font-semibold mb-6">Social</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 bg-secondary/10 hover:bg-secondary/20 transition-colors text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        
        {/* Column 3: Location & Copyright */}
        <div className="p-8 md:p-16">
          <h3 className="text-lg font-semibold mb-6">Location</h3>
          <p className="text-sm text-muted mb-8">
            Based in Ajman, United Arab Emirates.<br />
            Available for remote and international projects.
          </p>
          
          <div className="mt-12">
            <Link href="/">
              <svg width="40" height="40" viewBox="0 0 338 338" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M253.023 142.008L241.738 137.111L122.772 131.003L111.45 120.257L219.438 95.8024L277.99 107.722L205.271 58.5L32 89.615L77.3921 236.281L143.848 279.5L125.261 223.715L200.366 234.609L252.839 190.64L306 191.703L253.023 142.008ZM151.79 190.186C142.011 190.186 134.075 182.26 134.075 172.484C134.075 162.708 142.011 154.776 151.79 154.776C161.569 154.776 169.504 162.702 169.504 172.484C169.504 182.266 161.569 190.186 151.79 190.186Z" fill="currentColor"/>
              </svg>
            </Link>
          </div>
          
          <div className="mt-8 text-xs text-muted">
            <p>© {currentYear} Nasal Thanseer M Noufal.</p>
            <p className="mt-1">Portfolio & Personal Showcase.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}