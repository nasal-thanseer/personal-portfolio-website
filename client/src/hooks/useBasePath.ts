import { useLocation } from "wouter";

const base = "/personal-portfolio-website";

interface UseBasePathReturn {
  path: string;
  navigate: (to: string) => void;
  base: string;
}

export function useBasePath(): UseBasePathReturn {
  const [location, setLocation] = useLocation();

  const path = location.startsWith(base) ? location.slice(base.length) : location;
  
  const navigate = (to: string) => {
    setLocation(`${base}${to}`);
  };

  return { path, navigate, base };
} 