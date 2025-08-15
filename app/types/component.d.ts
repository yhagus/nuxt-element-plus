declare global {
  interface TableColumn {
    prop: string | ((prop: any, index: number, column: any) => string);
    label: string;
    width?: number | string;
    minWidth?: number | string;
    align?: 'center' | 'left' | 'right';
    headerAlign?: 'center';
    sort?: boolean;
    fixed?: 'right' | 'left';
    type?: 'default' | 'selection' | 'index' | 'expand';
    visible?: boolean;
    children?: TableColumn[];
  }

  interface DropdownItem {
    label: string;
    command: string;
    disabled?: boolean;
    icon?: string;
    onClick?: ((...args: any[]) => any);
  }
}

export {};
