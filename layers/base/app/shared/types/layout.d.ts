declare global {
  interface NavigationItem {
    name: string;
    route: string;
    icon?: string;
    children?: NavigationItem[];
  }
}

export {};
