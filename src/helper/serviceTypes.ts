export type ServiceListItem = {
  name: string;
  price: string;
};

export type RegularPlan = {
  set: string;
  monthly: string;
  bimonthly: string;
  threeMonthly: string;
};

export type ServiceSection =
  | {
      id: string;
      label: string;
      type: 'list';
      notes?: string[];
      items: ServiceListItem[];
      group?: 'standard' | 'special';
      wide?: boolean;
    }
  | {
      id: string;
      label: string;
      type: 'list';
      notes?: string[];
      items: ServiceListItem[];
      group?: 'standard' | 'special';
      wide?: boolean;
    }
  | {
      id: string;
      label: string;
      type: 'table';
      notes?: string[];
      monthlyHeading: string;
      bimonthlyHeading: string;
      threeMonthlyHeading: string;
      rows: RegularPlan[];
      group?: 'standard' | 'special';
      wide?: boolean;
    };
