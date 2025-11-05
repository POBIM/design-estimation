import { calculatePrice } from './src/utils/calculator';

console.log('=== ทดสอบการคำนวณค่าออกแบบและค่าคุมงาน ===\n');

// ทดสอบตามตัวอย่างที่ให้มา
console.log('📝 ทดสอบ: ราคาโครงการ 1 ล้านบาท (1,000,000 บาท)');
console.log('ค่าออกแบบ ไม่ซับซ้อน ควรได้ 45,000 บาท (4.5%)');

const test1 = calculatePrice(1, 'design', 'simple');
console.log(`ผลลัพธ์: ${test1.price.toLocaleString()} บาท`);
console.log(`✓ ถูกต้อง: ${test1.price === 45000 ? 'ใช่' : 'ไม่ใช่ ❌'}\n`);

// ทดสอบตามรูปที่แสดง
console.log('📝 ทดสอบ: ราคาโครงการ 5.555 ล้านบาท');
console.log('ค่าออกแบบ ไม่ซับซ้อน (ช่วง ไม่เกิน 50 ล้าน = 4.5%)');
const test2 = calculatePrice(5.555, 'design', 'simple');
console.log(`ผลลัพธ์: ${test2.price.toLocaleString()} บาท`);
console.log(`อัตรา: ${test2.percentage}%`);
console.log(`คำนวณ: 5.555 × ${test2.percentage} × 10,000 = ${test2.price.toLocaleString()}\n`);

// ทดสอบหลายกรณี
console.log('=== ทดสอบเพิ่มเติม ===\n');

const testCases = [
  { price: 1, service: 'design' as const, complexity: 'simple' as const, expected: 45000, desc: '1 ล้าน - ออกแบบไม่ซับซ้อน (4.5%)' },
  { price: 10, service: 'design' as const, complexity: 'simple' as const, expected: 450000, desc: '10 ล้าน - ออกแบบไม่ซับซ้อน (4.5%)' },
  { price: 100, service: 'design' as const, complexity: 'complex' as const, expected: 4000000, desc: '100 ล้าน - ออกแบบซับซ้อน (4%)' },
  { price: 300, service: 'design' as const, complexity: 'simple' as const, expected: 10500000, desc: '300 ล้าน - ออกแบบไม่ซับซ้อน (3.5%)' },
  { price: 1, service: 'supervision' as const, complexity: 'simple' as const, expected: 25000, desc: '1 ล้าน - คุมงานไม่ซับซ้อน (2.5%)' },
  { price: 5.555, service: 'supervision' as const, complexity: 'simple' as const, expected: 138875, desc: '5.555 ล้าน - คุมงานไม่ซับซ้อน (2.5%)' },
];

testCases.forEach((tc, index) => {
  const result = calculatePrice(tc.price, tc.service, tc.complexity);
  const isCorrect = result.price === tc.expected;
  console.log(`${index + 1}. ${tc.desc}`);
  console.log(`   คาดหวัง: ${tc.expected.toLocaleString()} บาท`);
  console.log(`   ได้: ${result.price.toLocaleString()} บาท`);
  console.log(`   ${isCorrect ? '✅ ถูกต้อง' : '❌ ผิด'}\n`);
});

console.log('=== สรุปตารางอัตรา ===\n');
console.log('ค่าออกแบบ:');
console.log('- ไม่เกิน 50 ล้าน: 4.5%, 6.5%, 8.5%');
console.log('- 50-250 ล้าน: 4%, 5.65%, 7%');
console.log('- 250-500 ล้าน: 3.5%, 5.25%, 6%');
console.log('- 500-1,000 ล้าน: 3%, 4.5%, 5%');
console.log('- 1,000-2,500 ล้าน: 2.5%, 4%, 4.5%');
console.log('- 2,500+ ล้าน: 2%, 3.5%, 4%\n');

console.log('ค่าคุมงาน:');
console.log('- ไม่เกิน 50 ล้าน: 2.5%, 3.5%, 4.5%');
console.log('- 50-250 ล้าน: 2%, 2.65%, 3%');
console.log('- 250-500 ล้าน: 1.5%, 2.25%, 2.5%');
console.log('- 500-1,000 ล้าน: 1%, 1.5%, 2%');
console.log('- 1,000-2,500 ล้าน: 0.5%, 1%, 1.5%');
console.log('- 2,500+ ล้าน: 0.5%, 0.5%, 1%');
