import { useLocation } from "wouter";

const base = "/personal-portfolio-website";

export function useBasePath() {
  const [location, setLocation] = useLocation();

  const path = location.startsWith(base) ? location.slice(base.length) : location;
  
  const navigate = (to: string) => {
    setLocation(`${base}${to}`);
  };

  return { path, navigate, base };
} 