import type { RegularPlan, ServiceListItem } from '../../helper/serviceTypes';

// 料金表の更新日
export const priceDate = '2025年3月1日';

// 水回りのサービス＆料金
export const waterItems: ServiceListItem[] = [
  { name: 'キッチン', price: '¥19,000' },
  { name: 'レンジフード', price: '¥18,000' },
  { name: 'トイレ', price: '¥8,000' },
  { name: '洗面所', price: '¥8,000' },
  { name: '浴室', price: '¥18,000' },
];

// 浴室のオプションメニュー
export const bathOpsItems: ServiceListItem[] = [
  { name: 'エプロン内部', price: '¥3,000' },
  { name: '乾燥機付き換気扇', price: '¥8,000' },
];

// エアコンクリーニングの料金
export const airconItems: ServiceListItem[] = [
  { name: 'ノーマル', price: '¥11,000/台' },
  { name: '　2台目以降', price: '¥9,000/台' },
  { name: 'お掃除機能付き', price: '¥22,000/台' },
  { name: '　2台目以降', price: '¥20,000/台' },
];

// セット割のプラン
export const bundlesItems: ServiceListItem[] = [
  { name: 'レンジフード＋浴室', price: '¥30,000' },
  { name: 'キッチン＋レンジフード', price: '¥30,000' },
  { name: 'キッチン＋浴室', price: '¥32,000' },
];

// 定期清掃プランの料金表
export const regularRows: RegularPlan[] = [
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
];
