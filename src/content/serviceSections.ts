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

export const serviceSections: ServiceSection[] = [
  {
    id: 'water',
    label: '水回り',
    type: 'list',
    items: [
      { name: 'キッチン', price: '¥19,000' },
      { name: 'レンジフード', price: '¥18,000' },
      { name: 'トイレ', price: '¥8,000' },
      { name: '洗面所', price: '¥8,000' },
      { name: '浴室', price: '¥18,000' },
    ],
  },
  {
    id: 'bath-ops',
    label: '浴室OP',
    type: 'list',
    items: [
      { name: 'エプロン内部', price: '¥3,000' },
      { name: '乾燥機付き換気扇', price: '¥8,000' },
    ],
  },
  {
    id: 'aircon',
    label: 'エアコン',
    type: 'list',
    notes: ["製造から９年以上経過しているエアコンは出来ない場合があります。"],
    items: [
      { name: 'ノーマル', price: '¥11,000/台' },
      { name: '　2台目以降', price: '¥9,000/台' },
      { name: 'お掃除機能付き', price: '¥22,000/台' },
      { name: '　2台目以降', price: '¥20,000/台' },
    ],
  },
  {
    id: 'bundles',
    label: 'セット割',
    type: 'list',
    group: 'special',
    wide: false,
    items: [
      { name: 'レンジフード＋浴室', price: '¥30,000' },
      { name: 'キッチン＋レンジフード', price: '¥30,000' },
      { name: 'キッチン＋浴室', price: '¥32,000' },
    ],
  },
  {
    id: 'regular',
    label: '定期',
    type: 'table',
    monthlyHeading: '1ヶ月',
    bimonthlyHeading: '2ヶ月',
    threeMonthlyHeading: '3ヶ月',
    group: 'special',
    wide: false,
    notes: ["初回は別途料金となります。詳しくはお見積り時にお尋ねください。"],
    rows: [
      {
        set: '浴室',
        monthly: '¥12,000',
        bimonthly: '¥14,000',
        threeMonthly: '¥16,000',
      },
      {
        set: 'キッチン＋浴室',
        monthly: '¥18,000',
        bimonthly: '¥22,000',
        threeMonthly: '¥28,000',
      },
      {
        set: 'キッチンor浴室＋トイレ＋洗面',
        monthly: '¥18,000',
        bimonthly: '¥22,000',
        threeMonthly: '¥28,000',
      },
      {
        set: 'キッチン＋浴室＋トイレ＋洗面',
        monthly: '¥20,000',
        bimonthly: '¥25,000',
        threeMonthly: '¥30,000',
      },
    ],
  },
];
