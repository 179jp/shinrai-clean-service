import {
  airconItems,
  bathOpsItems,
  bundlesItems,
  regularRows,
  waterItems,
} from '../content/services';
import type {
  RegularPlan,
  ServiceListItem,
  ServiceSection,
} from './serviceTypes';

export type { RegularPlan, ServiceListItem, ServiceSection } from './serviceTypes';

export const serviceSections: ServiceSection[] = [
  {
    id: 'water',
    label: '水回り',
    type: 'list',
    items: waterItems,
  },
  {
    id: 'bath-ops',
    label: '浴室OP',
    type: 'list',
    items: bathOpsItems,
  },
  {
    id: 'aircon',
    label: 'エアコン',
    type: 'list',
    notes: ["製造から９年以上経過しているエアコンは出来ない場合があります。"],
    items: airconItems,
  },
  {
    id: 'bundles',
    label: 'セット割',
    type: 'list',
    group: 'special',
    wide: false,
    items: bundlesItems,
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
    rows: regularRows,
  },
];
