// Work Category Data - อัตราค่าออกแบบและค่าควบคุมงานตามหมวดงาน
// ตามกฎกระทรวง พ.ศ. 2562

export type WorkCategoryId = 
  | 'architecture'
  | 'rail-transport'
  | 'road'
  | 'bridge-tunnel'
  | 'water-drainage'
  | 'airport';

export type ComplexityLevel = 'simple' | 'complex' | 'veryComplex';

export type RailTransportSubType = 'electric-highspeed' | 'longdistance-double';

export type RateValue = number | Record<ComplexityLevel, number> | Record<RailTransportSubType, number>;

export interface RateTier {
  maxBudget: number | null; // null = unlimited
  designRate: RateValue;
  supervisionRate: RateValue;
}

export interface WorkCategory {
  id: WorkCategoryId;
  name: string;
  icon: string;
  description: string;
  tiers: RateTier[];
  supportsComplexity?: boolean;
  supportsSubType?: boolean;
  specialtyDistribution?: {
    specialty: string;
    percentage: number;
  }[];
}

export const WORK_CATEGORIES: Record<WorkCategoryId, WorkCategory> = {
  // บัญชี ๑ - งานสถาปัตยกรรม
  architecture: {
    id: 'architecture',
    name: 'งานสถาปัตยกรรม',
    icon: '🏛️',
    description: 'งานออกแบบและควบคุมงานก่อสร้างอาคาร',
    supportsComplexity: true,
    tiers: [
      {
        maxBudget: 50_000_000,
        designRate: { simple: 4.5, complex: 6.5, veryComplex: 8.5 },
        supervisionRate: { simple: 4.5, complex: 6.5, veryComplex: 8.5 },
      },
      {
        maxBudget: 250_000_000,
        designRate: { simple: 4, complex: 4.25, veryComplex: 7 },
        supervisionRate: { simple: 4, complex: 4.25, veryComplex: 7 },
      },
      {
        maxBudget: 750_000_000,
        designRate: { simple: 3.5, complex: 4, veryComplex: 6 },
        supervisionRate: { simple: 3.5, complex: 4, veryComplex: 6 },
      },
      {
        maxBudget: 2_500_000_000,
        designRate: { simple: 3, complex: 3.5, veryComplex: 5 },
        supervisionRate: { simple: 3, complex: 3.5, veryComplex: 5 },
      },
      {
        maxBudget: 5_000_000_000,
        designRate: { simple: 2.5, complex: 3, veryComplex: 4 },
        supervisionRate: { simple: 2.5, complex: 3, veryComplex: 4 },
      },
      {
        maxBudget: null,
        designRate: { simple: 1.5, complex: 2.5, veryComplex: 3 },
        supervisionRate: { simple: 1.5, complex: 2.5, veryComplex: 3 },
      },
    ],
    specialtyDistribution: [
      { specialty: 'สถาปัตยกรรม', percentage: 40 },
      { specialty: 'โครงสร้าง', percentage: 30 },
      { specialty: 'สุขาภิบาล', percentage: 15 },
      { specialty: 'ไฟฟ้าและแสงสว่าง', percentage: 10 },
      { specialty: 'ภูมิสถาปัตย์', percentage: 5 },
    ],
  },

  // บัญชี ๒ - งานขนส่งระบบราง
  'rail-transport': {
    id: 'rail-transport',
    name: 'งานขนส่งระบบราง',
    icon: '🚄',
    description: 'งานระบบรางรถไฟฟ้า รถไฟความเร็วสูง และรถไฟทางไกล',
    supportsSubType: true,
    tiers: [
      {
        maxBudget: 10_000_000_000,
        designRate: {
          'electric-highspeed': 2.25,
          'longdistance-double': 2.0,
        },
        supervisionRate: {
          'electric-highspeed': 5.5,
          'longdistance-double': 5.0,
        },
      },
      {
        maxBudget: 30_000_000_000,
        designRate: {
          'electric-highspeed': 2.0,
          'longdistance-double': 1.75,
        },
        supervisionRate: {
          'electric-highspeed': 5.0,
          'longdistance-double': 4.5,
        },
      },
      {
        maxBudget: 60_000_000_000,
        designRate: {
          'electric-highspeed': 1.75,
          'longdistance-double': 1.5,
        },
        supervisionRate: {
          'electric-highspeed': 4.5,
          'longdistance-double': 4.0,
        },
      },
      {
        maxBudget: null,
        designRate: {
          'electric-highspeed': 1.25,
          'longdistance-double': 1.0,
        },
        supervisionRate: {
          'electric-highspeed': 3.5,
          'longdistance-double': 3.0,
        },
      },
    ],
    specialtyDistribution: [
      { specialty: 'วิศวกรรมราง', percentage: 30 },
      { specialty: 'โครงสร้าง', percentage: 25 },
      { specialty: 'ไฟฟ้าและสัญญาณ', percentage: 25 },
      { specialty: 'วิศวกรรมโยธา', percentage: 15 },
      { specialty: 'สถาปัตยกรรม', percentage: 5 },
    ],
  },

  // บัญชี ๓ ข้อ ๑ - งานถนน
  road: {
    id: 'road',
    name: 'งานถนน',
    icon: '🛣️',
    description: 'งานออกแบบและควบคุมงานก่อสร้างถนน',
    tiers: [
      { maxBudget: 100_000_000, designRate: 3, supervisionRate: 3.5 },
      { maxBudget: 1_000_000_000, designRate: 2.5, supervisionRate: 3 },
      { maxBudget: 5_000_000_000, designRate: 2, supervisionRate: 2.5 },
      { maxBudget: null, designRate: 1, supervisionRate: 1.5 },
    ],
    specialtyDistribution: [
      { specialty: 'วิศวกรรมโยธา', percentage: 50 },
      { specialty: 'จราจรและขนส่ง', percentage: 25 },
      { specialty: 'ภูมิสถาปัตย์', percentage: 15 },
      { specialty: 'สิ่งแวดล้อม', percentage: 10 },
    ],
  },

  // บัญชี ๓ ข้อ ๒ - งานสะพาน/ทางยกระดับ/อุโมงค์/โครงสร้างน้ำ
  'bridge-tunnel': {
    id: 'bridge-tunnel',
    name: 'งานสะพาน/ทางยกระดับ/อุโมงค์',
    icon: '🌉',
    description: 'งานโครงสร้างพิเศษ สะพาน อุโมงค์ และระบบโครงสร้างน้ำ',
    tiers: [
      { maxBudget: 100_000_000, designRate: 4, supervisionRate: 4.5 },
      { maxBudget: 1_000_000_000, designRate: 3.5, supervisionRate: 4 },
      { maxBudget: 5_000_000_000, designRate: 3, supervisionRate: 3.5 },
      { maxBudget: null, designRate: 2, supervisionRate: 2.5 },
    ],
    specialtyDistribution: [
      { specialty: 'วิศวกรรมโครงสร้าง', percentage: 45 },
      { specialty: 'วิศวกรรมโยธา', percentage: 30 },
      { specialty: 'ธรณีวิทยา', percentage: 15 },
      { specialty: 'สถาปัตยกรรม', percentage: 10 },
    ],
  },

  // บัญชี ๓ ข้อ ๓ - งานประปา/ระบายน้ำ/ป้องกันน้ำท่วม
  'water-drainage': {
    id: 'water-drainage',
    name: 'งานประปา/ระบบระบายน้ำ',
    icon: '💧',
    description: 'งานระบบประปา ระบายน้ำ และป้องกันน้ำท่วม',
    tiers: [
      { maxBudget: 100_000_000, designRate: 4, supervisionRate: 4.5 },
      { maxBudget: 1_000_000_000, designRate: 3.5, supervisionRate: 4 },
      { maxBudget: 5_000_000_000, designRate: 3, supervisionRate: 3.5 },
      { maxBudget: null, designRate: 2, supervisionRate: 2.5 },
    ],
    specialtyDistribution: [
      { specialty: 'วิศวกรรมสุขาภิบาล', percentage: 40 },
      { specialty: 'วิศวกรรมโยธา', percentage: 30 },
      { specialty: 'ไฟฟ้าและระบบควบคุม', percentage: 20 },
      { specialty: 'สิ่งแวดล้อม', percentage: 10 },
    ],
  },

  // บัญชี ๓ ข้อ ๔ - งานสนามบิน
  airport: {
    id: 'airport',
    name: 'งานสนามบิน',
    icon: '✈️',
    description: 'งานออกแบบและควบคุมงานสนามบิน',
    tiers: [
      { maxBudget: 100_000_000, designRate: 4.5, supervisionRate: 5 },
      { maxBudget: 1_000_000_000, designRate: 4, supervisionRate: 4.5 },
      { maxBudget: 5_000_000_000, designRate: 3.5, supervisionRate: 4 },
      { maxBudget: null, designRate: 2.5, supervisionRate: 3 },
    ],
    specialtyDistribution: [
      { specialty: 'วิศวกรรมโยธา', percentage: 35 },
      { specialty: 'สถาปัตยกรรม', percentage: 25 },
      { specialty: 'ไฟฟ้าและระบบนำทาง', percentage: 20 },
      { specialty: 'วิศวกรรมจราจรทางอากาศ', percentage: 20 },
    ],
  },
};

export const WORK_CATEGORY_OPTIONS = Object.values(WORK_CATEGORIES);

export function getWorkCategory(id: WorkCategoryId): WorkCategory {
  return WORK_CATEGORIES[id];
}

function resolveRate(
  value: RateValue, 
  complexity?: ComplexityLevel,
  subType?: RailTransportSubType
): number {
  if (typeof value === 'number') {
    return value;
  }
  
  // Check if it's a RailTransportSubType record
  if (subType && 'electric-highspeed' in value) {
    return (value as Record<RailTransportSubType, number>)[subType];
  }
  
  // Otherwise it's a ComplexityLevel record
  const complexityRecord = value as Record<ComplexityLevel, number>;
  const level = complexity && complexityRecord[complexity] !== undefined ? complexity : 'simple';
  return complexityRecord[level];
}

export function calculateRate(
  categoryId: WorkCategoryId,
  projectBudget: number,
  type: 'design' | 'supervision',
  complexity?: ComplexityLevel,
  subType?: RailTransportSubType
): { rate: number; tier: RateTier } {
  const category = WORK_CATEGORIES[categoryId];
  
  for (const tier of category.tiers) {
    if (tier.maxBudget === null || projectBudget <= tier.maxBudget) {
      const rateValue = type === 'design' ? tier.designRate : tier.supervisionRate;
      const rate = resolveRate(rateValue, complexity, subType);
      return { rate, tier };
    }
  }
  
  // Fallback to last tier
  const lastTier = category.tiers[category.tiers.length - 1];
  const lastRateValue = type === 'design' ? lastTier.designRate : lastTier.supervisionRate;
  const rate = resolveRate(lastRateValue, complexity, subType);
  return { rate, tier: lastTier };
}
