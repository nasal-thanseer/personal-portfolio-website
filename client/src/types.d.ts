declare module 'wouter' {
  export function useLocation(): [string, (to: string) => void];
  export function Link(props: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }): JSX.Element;
  export function Route(props: { path: string; children: React.ReactNode }): JSX.Element;
  export function Switch(props: { location: string; children: React.ReactNode; key?: string }): JSX.Element;
}

declare module 'lucide-react' {
  export const Menu: React.FC<{ className?: string }>;
  export const X: React.FC<{ className?: string }>;
}

declare module 'framer-motion' {
  export const AnimatePresence: React.FC<{ children: React.ReactNode; mode?: string }>;
} 