import { Link as WouterLink } from "wouter";
import { useBasePath } from "../hooks/useBasePath";

interface BaseLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BaseLink({ href, children, ...props }: BaseLinkProps) {
  const { base } = useBasePath();
  const fullHref = href.startsWith("http") ? href : `${base}${href}`;
  
  return (
    <WouterLink href={fullHref} {...props}>
      {children}
    </WouterLink>
  );
} 