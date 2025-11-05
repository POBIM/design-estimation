/**
 * ตารางคำนวณค่าออกแบบและค่าคุมงานตามเงื่อนไข
 * โดยคำนวณจากราคาโครงการ (ล้านบาท)
 */

interface PriceRange {
  min: number; // ล้านบาท
  max: number; // ล้านบาท
  simple: number; // อัตราไม่ซับซ้อน (%)
  complex: number; // อัตราซับซ้อน (%)
  veryComplex: number; // อัตราซับซ้อนมาก (%)
  description?: string;
}

// ตารางอัตราค่าออกแบบ
const designRates: PriceRange[] = [
  { 
    min: 0, 
    max: 50, 
    simple: 4.5, 
    complex: 6.5, 
    veryComplex: 8.5,
    description: 'ไม่เกิน 50 ล้านบาท' 
  },
  { 
    min: 50, 
    max: 250, 
    simple: 4, 
    complex: 5.65, 
    veryComplex: 7,
    description: 'ตั้งแต่ 50 แต่ไม่เกิน 250 ล้านบาท' 
  },
  { 
    min: 250, 
    max: 500, 
    simple: 3.5, 
    complex: 5.25, 
    veryComplex: 6,
    description: 'ตั้งแต่ 250 แต่ไม่เกิน 500 ล้านบาท' 
  },
  { 
    min: 500, 
    max: 1000, 
    simple: 3, 
    complex: 4.5, 
    veryComplex: 5,
    description: 'ตั้งแต่ 500 แต่ไม่เกิน 1,000 ล้านบาท' 
  },
  { 
    min: 1000, 
    max: 2500, 
    simple: 2.5, 
    complex: 4, 
    veryComplex: 4.5,
    description: 'ตั้งแต่ 1,000 แต่ไม่เกิน 2,500 ล้านบาท' 
  },
  { 
    min: 2500, 
    max: Number.MAX_VALUE, 
    simple: 2, 
    complex: 3.5, 
    veryComplex: 4,
    description: 'ตั้งแต่ 2,500 ล้านบาท ขึ้นไป' 
  },
];

// ตารางอัตราค่าคุมงาน
const supervisionRates: PriceRange[] = [
  { 
    min: 0, 
    max: 50, 
    simple: 2.5, 
    complex: 3.5, 
    veryComplex: 4.5,
    description: 'ไม่เกิน 50 ล้านบาท' 
  },
  { 
    min: 50, 
    max: 250, 
    simple: 2, 
    complex: 2.65, 
    veryComplex: 3,
    description: 'ตั้งแต่ 50 แต่ไม่เกิน 250 ล้านบาท' 
  },
  { 
    min: 250, 
    max: 500, 
    simple: 1.5, 
    complex: 2.25, 
    veryComplex: 2.5,
    description: 'ตั้งแต่ 250 แต่ไม่เกิน 500 ล้านบาท' 
  },
  { 
    min: 500, 
    max: 1000, 
    simple: 1, 
    complex: 1.5, 
    veryComplex: 2,
    description: 'ตั้งแต่ 500 แต่ไม่เกิน 1,000 ล้านบาท' 
  },
  { 
    min: 1000, 
    max: 2500, 
    simple: 0.5, 
    complex: 1, 
    veryComplex: 1.5,
    description: 'ตั้งแต่ 1,000 แต่ไม่เกิน 2,500 ล้านบาท' 
  },
  { 
    min: 2500, 
    max: Number.MAX_VALUE, 
    simple: 0.5, 
    complex: 0.5, 
    veryComplex: 1,
    description: 'ตั้งแต่ 2,500 ล้านบาท ขึ้นไป' 
  },
];

export interface CalculationResult {
  price: number;
  percentage: number;
  complexity: 'simple' | 'complex' | 'veryComplex';
  complexityLabel: string;
  description?: string;
}

/**
 * คำนวณราคาบริการตามประเภท ระดับความซับซ้อน และราคาโครงการ
 * @param projectPrice - ราคาโครงการ (ล้านบาท)
 * @param serviceType - ประเภทบริการ ('design' หรือ 'supervision')
 * @param complexity - ระดับความซับซ้อน ('simple', 'complex', 'veryComplex')
 * @returns ผลการคำนวณ
 */
export function calculatePrice(
  projectPrice: number,
  serviceType: 'design' | 'supervision',
  complexity: 'simple' | 'complex' | 'veryComplex' = 'simple'
): CalculationResult {
  const rates = serviceType === 'design' ? designRates : supervisionRates;

  // หาเกณฑ์ที่เหมาะสม
  const rate = rates.find(
    (r) => projectPrice >= r.min && projectPrice <= r.max
  );

  if (!rate) {
    throw new Error('ไม่สามารถคำนวณได้ เนื่องจากราคาโครงการอยู่นอกเกณฑ์');
  }

  // เลือกอัตราตามความซับซ้อน (อัตรานี้คือ % ต่อ 1 ล้านบาท)
  let ratePerMillion = rate.simple;
  let complexityLabel = 'ไม่ซับซ้อน';

  if (complexity === 'complex') {
    ratePerMillion = rate.complex;
    complexityLabel = 'ซับซ้อน';
  } else if (complexity === 'veryComplex') {
    ratePerMillion = rate.veryComplex;
    complexityLabel = 'ซับซ้อนมาก';
  }

  // คำนวณ: (ราคาโครงการในล้านบาท) × (อัตร% / 100) × 1,000,000
  // หรือ: ราคาโครงการในล้านบาท × อัตร% × 10,000
  const calculatedPrice = projectPrice * ratePerMillion * 10000;

  return {
    price: Math.round(calculatedPrice),
    percentage: ratePerMillion,
    complexity,
    complexityLabel,
    description: rate.description,
  };
}

/**
 * ได้รับอัตราการคำนวณตามราคาโครงการ
 */
export function getRate(projectPrice: number, serviceType: 'design' | 'supervision'): PriceRange | null {
  const rates = serviceType === 'design' ? designRates : supervisionRates;
  return rates.find((r) => projectPrice >= r.min && projectPrice <= r.max) || null;
}
