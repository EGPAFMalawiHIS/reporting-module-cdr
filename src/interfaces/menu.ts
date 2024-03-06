export interface MenuItem {
  label: string;
  url: string;
  icon?: string;
  img?: string;
  children?: MenuItem[];
  condition?: boolean | (() => Promise<boolean> | boolean);
}