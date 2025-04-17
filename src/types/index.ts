
export interface NavItem {
  path: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MainNavItem {
  title: string;
  href: string;
  name?: string;
}
