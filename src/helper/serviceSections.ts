import {
  airconItems,
  bathOpsItems,
  regularRows,
  waterItems,
} from '../content/services';
import type {
  RegularPlan,
  ServiceListItem,
  ServiceSection,
} from './serviceTypes';
import { airconNotes, regularNotes } from '../content/services/notes';

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
    notes: airconNotes,
    items: airconItems,
  },
  {
    id: 'regular',
    label: '定期（一例）',
    type: 'table',
    monthlyHeading: '1ヶ月',
    bimonthlyHeading: '2ヶ月',
    threeMonthlyHeading: '3ヶ月',
    group: 'special',
    wide: false,
    notes: regularNotes,
    rows: regularRows,
  },
];
