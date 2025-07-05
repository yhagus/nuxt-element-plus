declare global {
  interface TableColumn {
    label: string;
    prop: string | ((prop: any, index: number, column: any) => string);
    type?: 'default' | 'selection' | 'index' | 'expand';
    visible?: boolean;
    align?: 'center';
    width?: number;
    maxWidth?: number;
    sortable?: boolean;
    fixed?: 'right' | 'left';
    selectable?: (row: any, index: number) => boolean;
    reserveSelection?: boolean;
  }
}

export {};
