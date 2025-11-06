'use client';

import { useState, useEffect } from 'react';
import SpecialtyDialog from './SpecialtyDialog';
import WorkCategorySelector from './WorkCategorySelector';
import {
  WorkCategoryId,
  calculateRate,
  getWorkCategory,
  ComplexityLevel,
  RailTransportSubType,
} from '@/utils/workCategoryData';

interface CalculatorProps {
  serviceType: 'design' | 'supervision';
  workCategory: WorkCategoryId;
  onWorkCategoryChange: (categoryId: WorkCategoryId) => void;
}

interface SpecialtyCalculation {
  specialty: string;
  percentage: number;
}

interface CalculationResult {
  price: number;
  rate: number;
  projectPrice: number;
  categoryName: string;
  complexity?: ComplexityLevel;
  subType?: RailTransportSubType;
}

export default function Calculator({ serviceType, workCategory, onWorkCategoryChange }: CalculatorProps) {
  const [projectPrice, setProjectPrice] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [complexity, setComplexity] = useState<ComplexityLevel>('simple');
  const [railSubType, setRailSubType] = useState<RailTransportSubType>('electric-highspeed');

  // Get category data
  const category = getWorkCategory(workCategory);
  const [specialtiesData, setSpecialtiesData] = useState<SpecialtyCalculation[]>(
    category.specialtyDistribution || []
  );

  // Update specialties when category changes
  useEffect(() => {
    const newCategory = getWorkCategory(workCategory);
    if (newCategory.specialtyDistribution) {
      setSpecialtiesData(newCategory.specialtyDistribution);
    }
    setComplexity('simple');
    setRailSubType('electric-highspeed');
  }, [workCategory]);

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

    // Use new calculation based on work category
    const selectedComplexity = category.supportsComplexity ? complexity : undefined;
    const selectedSubType = category.supportsSubType ? railSubType : undefined;
    const { rate } = calculateRate(workCategory, priceInBaht, serviceType, selectedComplexity, selectedSubType);
    const feeAmount = (priceInBaht * rate) / 100;

    setResult({
      price: feeAmount,
      rate: rate,
      projectPrice: priceInBaht,
      categoryName: category.name,
      complexity: selectedComplexity,
      subType: selectedSubType,
    });
  };

  const handleSpecialtyChange = (index: number, value: number) => {
    const newData = [...specialtiesData];
    newData[index].percentage = value;
    setSpecialtiesData(newData);
  };

  const complexityLabels: Record<ComplexityLevel, string> = {
    simple: 'ไม่ซับซ้อน',
    complex: 'ซับซ้อน',
    veryComplex: 'ซับซ้อนมาก',
  };

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
              เลือกหมวดงานและกรอกราคาโครงการ
            </p>
          </div>
        </div>

        {/* Work Category Selector */}
        <div className="mb-6">
          <WorkCategorySelector
            value={workCategory}
            onChange={onWorkCategoryChange}
          />
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

        {category.supportsComplexity && (
          <div className="mb-6">
            <label className="block text-theme-primary font-semibold mb-3 text-base">
              ระดับความซับซ้อนของโครงการ
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['simple', 'complex', 'veryComplex'] as ComplexityLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setComplexity(level)}
                  className={`p-4 rounded-xl font-semibold transition-all duration-200 border-2 ${
                    complexity === level
                      ? 'border-gray-800 bg-gray-100 scale-105'
                      : 'border-theme-gray-medium bg-white hover:border-gray-600'
                  }`}
                >
                  {complexityLabels[level]}
                </button>
              ))}
            </div>
          </div>
        )}

        {category.supportsSubType && (
          <div className="mb-6">
            <label className="block text-theme-primary font-semibold mb-3 text-base">
              ประเภทงานระบบราง
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setRailSubType('electric-highspeed')}
                className={`p-4 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  railSubType === 'electric-highspeed'
                    ? 'border-gray-800 bg-gray-100 scale-105'
                    : 'border-theme-gray-medium bg-white hover:border-gray-600'
                }`}
              >
                🚄 รถไฟฟ้า / ความเร็วสูง
              </button>
              <button
                onClick={() => setRailSubType('longdistance-double')}
                className={`p-4 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  railSubType === 'longdistance-double'
                    ? 'border-gray-800 bg-gray-100 scale-105'
                    : 'border-theme-gray-medium bg-white hover:border-gray-600'
                }`}
              >
                🚂 รถไฟทางไกล / รถไฟคู่
              </button>
            </div>
          </div>
        )}

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
                <span className="text-theme-secondary font-medium text-sm">หมวดงาน:</span>
                <span className="badge-primary">
                  {result.categoryName}
                </span>
              </div>
              {category.supportsComplexity && result.complexity && (
                <div className="flex justify-between items-center pb-3 border-b border-theme">
                  <span className="text-theme-secondary font-medium text-sm">ระดับความซับซ้อน:</span>
                  <span className="badge-primary">
                    {complexityLabels[result.complexity]}
                  </span>
                </div>
              )}
              {category.supportsSubType && result.subType && (
                <div className="flex justify-between items-center pb-3 border-b border-theme">
                  <span className="text-theme-secondary font-medium text-sm">ประเภทงาน:</span>
                  <span className="badge-primary">
                    {result.subType === 'electric-highspeed' ? '🚄 รถไฟฟ้า / ความเร็วสูง' : '🚂 รถไฟทางไกล / รถไฟคู่'}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pb-3 border-b border-theme">
                <span className="text-theme-secondary font-medium text-sm">ราคาโครงการ:</span>
                <span className="text-lg font-bold text-theme-primary">
                  {parseFloat(projectPrice).toLocaleString('th-TH')} บาท
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-theme">
                <span className="text-theme-secondary font-medium text-sm">อัตราคำนวณ:</span>
                <span className="text-base font-semibold text-theme-red-dark">
                  {result.rate}%
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

          {/* Specialty Breakdown Table */}
          <div className="bg-theme-light card-base p-3 md:p-6 mb-6 border-2 border-theme-gray-medium">
            <h4 className="text-base md:text-lg font-bold text-theme-primary mb-3 md:mb-4 flex items-center gap-2">
              <span>📋</span> แบ่งรายละเอียดตามสาขาวิชา
            </h4>

            {/* Summary Table */}
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-black text-white">
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left font-bold rounded-tl-lg text-xs md:text-sm">สาขาวิชา</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-center font-bold text-xs md:text-sm">%</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-right font-bold rounded-tr-lg text-xs md:text-sm">ค่า{serviceName}</th>
                  </tr>
                </thead>
                <tbody>
                  {specialtiesData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-theme-gray-medium ${
                        index % 2 === 0 ? 'bg-white' : 'bg-theme-gray-light'
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-2 md:px-4 py-2 md:py-3 font-semibold text-theme-primary text-xs md:text-sm">
                        {item.specialty}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                        <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-gray-800 to-black text-white rounded-full font-bold text-xs md:text-sm">
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-right font-bold text-theme-red-dark text-xs md:text-sm">
                        {Math.round((result.price * item.percentage) / 100).toLocaleString('th-TH')} บาท
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-gray-800 to-black font-bold text-white rounded-b-lg">
                    <td className="px-2 md:px-4 py-2 md:py-3 rounded-bl-lg text-xs md:text-sm">รวมทั้งสิ้น</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                      <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-white text-gray-800 rounded-full font-bold text-xs md:text-sm">
                        100%
                      </span>
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-right rounded-br-lg text-xs md:text-sm">
                      {result.price.toLocaleString('th-TH')} บาท
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Edit Button */}
            <div className="mt-3 md:mt-4">
              <button
                onClick={() => setShowDialog(true)}
                className="btn-primary w-full text-xs md:text-sm py-2 md:py-3"
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
