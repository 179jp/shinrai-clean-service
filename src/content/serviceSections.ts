export type ServiceListItem = {
  name: string;
  price: string;
};

export type RegularPlan = {
  set: string;
  monthly: string;
  bimonthly: string;
};

export type ServiceSection =
  | {
      id: string;
      label: string;
      type: 'list';
      items: ServiceListItem[];
      group?: 'standard' | 'special';
      wide?: boolean;
    }
  | {
      id: string;
      label: string;
      type: 'bullets';
      bullets: string[];
      group?: 'standard' | 'special';
      wide?: boolean;
    }
  | {
      id: string;
      label: string;
      type: 'table';
      monthlyHeading: string;
      bimonthlyHeading: string;
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
      { name: '浴室', price: '¥18,000' },
      { name: '浴室＋洗面台', price: '¥22,000' },
      { name: 'トイレ', price: '¥8,000' },
      { name: '浴室＋トイレ', price: '¥20,000' },
      { name: '浴室＋トイレ＋洗面台', price: '¥26,000' },
    ],
  },
  {
    id: 'bath-ops',
    label: '浴室OP',
    type: 'list',
    items: [
      { name: '防カビコート（浴室）', price: '¥3,000' },
      { name: '鏡のウロコ取り（浴室）', price: '¥6,000' },
      { name: '浴室エプロン内部高圧洗浄', price: '¥4,000' },
    ],
  },
  {
    id: 'aircon',
    label: 'エアコン',
    type: 'list',
    items: [
      { name: 'エアコンクリーニング（内部高圧洗浄コース）', price: '¥22,000' },
      { name: 'お掃除機能付きエアコン追加', price: '¥8,000' },
      { name: '室外機（1台につき）', price: '¥4,000' },
    ],
  },
  {
    id: 'bundles',
    label: 'セット割',
    type: 'bullets',
    group: 'special',
    wide: true,
    bullets: [
      'キッチン＋浴室＋トイレ＋洗面台：¥36,000',
      '浴室＋トイレ＋洗面台：¥26,000',
      '浴室＋トイレ：¥20,000',
      '浴室＋トイレ＋洗面台＋エアコン＋室外機：¥67,000',
    ],
  },
  {
    id: 'regular',
    label: '定期',
    type: 'table',
    monthlyHeading: '1カ月定期サービス',
    bimonthlyHeading: '2カ月定期サービス',
    group: 'special',
    wide: true,
    rows: [
      {
        set: 'キッチン＋浴室＋トイレ＋洗面台',
        monthly: '¥20,000',
        bimonthly: '¥26,000',
      },
      {
        set: '浴室＋トイレ＋洗面台',
        monthly: '¥26,000',
        bimonthly: '¥28,000',
      },
      {
        set: '浴室＋トイレ',
        monthly: '¥18,000',
        bimonthly: '¥20,000',
      },
      {
        set: 'トイレ＋洗面台',
        monthly: '¥16,000',
        bimonthly: '¥18,000',
      },
    ],
  },
];
