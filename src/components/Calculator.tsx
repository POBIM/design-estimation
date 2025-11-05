'use client';

import { useState, useEffect } from 'react';
import { calculatePrice } from '@/utils/calculator';
import SpecialtyDialog from './SpecialtyDialog';

interface CalculatorProps {
  serviceType: 'design' | 'supervision';
}

interface SpecialtyCalculation {
  specialty: string;
  percentage: number;
}

const specialties: SpecialtyCalculation[] = [
  { specialty: 'สถาปัตยกรรม', percentage: 40 },
  { specialty: 'โครงสร้าง', percentage: 30 },
  { specialty: 'ระบบไฟฟ้า', percentage: 17 },
  { specialty: 'ระบบสุขาภิบาล', percentage: 13 },
];

export default function Calculator({ serviceType }: CalculatorProps) {
  const [projectPrice, setProjectPrice] = useState<string>('');
  const [complexity, setComplexity] = useState<'simple' | 'complex' | 'veryComplex'>('simple');
  const [result, setResult] = useState<any>(null);
  const [specialtiesData, setSpecialtiesData] = useState<SpecialtyCalculation[]>(specialties);
  const [showDialog, setShowDialog] = useState(false);

  // Read estimated cost from localStorage on component mount
  useEffect(() => {
    const estimatedCost = localStorage.getItem('estimatedConstructionCost');
    if (estimatedCost) {
      setProjectPrice(estimatedCost);
      localStorage.removeItem('estimatedConstructionCost'); // Clear after reading
    }
  }, []);

  const handleCalculate = () => {
    const priceInBaht = parseFloat(projectPrice);
    
    if (!priceInBaht || priceInBaht <= 0) {
      alert('กรุณากรอกราคาโครงการที่มากกว่า 0');
      return;
    }

    const priceInMillion = priceInBaht / 1000000;
    const calculation = calculatePrice(priceInMillion, serviceType, complexity);
    setResult(calculation);
  };

  const handleSpecialtyChange = (index: number, value: number) => {
    const newData = [...specialtiesData];
    newData[index].percentage = value;
    setSpecialtiesData(newData);
  };

  const complexityOptions = [
    { value: 'simple' as const, label: 'ไม่ซับซ้อน', color: 'bg-theme-gray-light border-theme-gray-medium hover:bg-theme-gray-medium', activeColor: 'bg-theme-gray-medium border-theme-gray-darker' },
    { value: 'complex' as const, label: 'ซับซ้อน', color: 'bg-red-100 border-red-300 hover:bg-red-200', activeColor: 'bg-red-200 border-red-600' },
    { value: 'veryComplex' as const, label: 'ซับซ้อนมาก', color: 'bg-theme-red-light border-theme-red-medium hover:bg-theme-red-medium', activeColor: 'bg-theme-red-medium border-theme-red-dark' },
  ];

  const serviceName = serviceType === 'design' ? 'ค่าออกแบบ' : 'ค่าคุมงาน';
  const serviceIcon = serviceType === 'design' ? '✏️' : '🔍';

  return (
    <div className="card-base p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{serviceIcon}</span>
          <div>
            <h2 className="text-2xl font-bold text-theme-primary">
              คำนวณ{serviceName}
            </h2>
            <p className="text-theme-secondary text-sm mt-1">
              กรุณากรอกราคาโครงการและเลือกระดับความซับซ้อน
            </p>
          </div>
        </div>

        {/* Project Price Input */}
        <div className="mb-6">
          <label className="block text-theme-primary font-semibold mb-3 text-base">
            ราคาโครงการ (บาท) <span className="text-theme-red-dark">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={projectPrice}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (value === '' || /^\d+\.?\d*$/.test(value)) {
                  setProjectPrice(value);
                }
              }}
              className="input-theme w-full text-lg"
              placeholder="กรอกราคาโครงการ เช่น 5555000"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-secondary font-semibold">
              บาท
            </div>
          </div>
          {projectPrice && (
            <p className="mt-2 text-sm text-theme-secondary">
              = {(parseFloat(projectPrice) / 1000000).toLocaleString('th-TH', { maximumFractionDigits: 2 })} ล้านบาท
            </p>
          )}
        </div>

        {/* Complexity Selection */}
        <div className="mb-8">
          <label className="block text-theme-primary font-semibold mb-3 text-base">
            ระดับความซับซ้อนของโครงการ <span className="text-theme-red-dark">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {complexityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setComplexity(option.value)}
                className={`p-4 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  complexity === option.value
                    ? `${option.activeColor} ring-2 ring-red-600 scale-105`
                    : `${option.color}`
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="btn-primary w-full mb-4 text-base"
        >
          🔍 คำนวณราคา
        </button>

        {/* Breakdown Button */}
        {result && (
          <button
            onClick={() => setShowDialog(true)}
            className="btn-secondary w-full text-base"
          >
            ⚙️ ปรับปรุงสาขาวิชา
          </button>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="border-t border-theme pt-8">
          <h3 className="text-xl font-bold text-theme-primary mb-6 flex items-center gap-2">
            <span>📊</span> ผลการคำนวณ
          </h3>
          
          <div className="bg-theme-light card-base p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-theme">
                <span className="text-theme-secondary font-medium text-sm">ราคาโครงการ:</span>
                <span className="text-lg font-bold text-theme-primary">
                  {parseFloat(projectPrice).toLocaleString('th-TH')} บาท
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-theme">
                <span className="text-theme-secondary font-medium text-sm">ระดับความซับซ้อน:</span>
                <span className="badge-primary">
                  {result.complexityLabel}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-theme">
                <span className="text-theme-secondary font-medium text-sm">อัตราคำนวณ:</span>
                <span className="text-base font-semibold text-theme-red-dark">
                  {result.percentage}%
                </span>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-theme-primary font-bold text-lg">
                  {serviceName}:
                </span>
                <span className="text-3xl font-bold text-theme-red-dark">
                  {result.price.toLocaleString('th-TH')} บาท
                </span>
              </div>
            </div>
          </div>

          {/* Rate Information */}
          <div className="bg-theme-gray-light card-base p-4 mb-6">
            <p className="text-xs text-theme-primary">
              <span className="font-semibold">📌 เกณฑ์:</span> {result.description}
            </p>
          </div>

          {/* Specialty Breakdown Table */}
          <div className="bg-theme-light card-base p-6 mb-6 border-2 border-theme-gray-medium">
            <h4 className="text-lg font-bold text-theme-primary mb-4 flex items-center gap-2">
              <span>📋</span> แบ่งรายละเอียดตามสาขาวิชา
            </h4>

            {/* Summary Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <th className="px-4 py-3 text-left font-bold rounded-tl-lg">สาขาวิชา</th>
                    <th className="px-4 py-3 text-center font-bold">%</th>
                    <th className="px-4 py-3 text-right font-bold rounded-tr-lg">ค่า{serviceName}</th>
                  </tr>
                </thead>
                <tbody>
                  {specialtiesData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-theme-gray-medium ${
                        index % 2 === 0 ? 'bg-white' : 'bg-theme-gray-light'
                      } hover:bg-red-50 transition-colors`}
                    >
                      <td className="px-4 py-3 font-semibold text-theme-primary">
                        {item.specialty}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="badge-primary">
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-theme-red-dark">
                        {Math.round((result.price * item.percentage) / 100).toLocaleString('th-TH')} บาท
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-red-600 to-red-700 font-bold text-white rounded-b-lg">
                    <td className="px-4 py-3 rounded-bl-lg">รวมทั้งสิ้น</td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge-primary">
                        100%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right rounded-br-lg">
                      {result.price.toLocaleString('th-TH')} บาท
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Edit Button */}
            <div className="mt-4">
              <button
                onClick={() => setShowDialog(true)}
                className="btn-primary w-full text-sm"
              >
                ⚙️ ปรับปรุงเปอร์เซ็นต์
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Specialty Dialog */}
      <SpecialtyDialog
        isOpen={showDialog}
        specialtiesData={specialtiesData}
        onClose={() => setShowDialog(false)}
        onSave={(data: SpecialtyCalculation[]) => setSpecialtiesData(data)}
      />
    </div>
  );
}
