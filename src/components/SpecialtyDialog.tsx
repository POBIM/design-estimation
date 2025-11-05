'use client';

import { useState, useEffect } from 'react';

interface SpecialtyCalculation {
  specialty: string;
  percentage: number;
}

interface SpecialtyDialogProps {
  isOpen: boolean;
  specialtiesData: SpecialtyCalculation[];
  onClose: () => void;
  onSave: (data: SpecialtyCalculation[]) => void;
}

export default function SpecialtyDialog({
  isOpen,
  specialtiesData,
  onClose,
  onSave,
}: SpecialtyDialogProps) {
  const [tempData, setTempData] = useState<SpecialtyCalculation[]>(specialtiesData);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTempData(specialtiesData);
    setError('');
  }, [specialtiesData, isOpen]);

  const handleChange = (index: number, value: number) => {
    const newData = [...tempData];
    newData[index].percentage = Math.max(0, Math.min(100, value));
    setTempData(newData);
    validatePercentages(newData);
  };

  const validatePercentages = (data: SpecialtyCalculation[]) => {
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    if (total !== 100) {
      setError(`รวมทั้งหมด ${total}% (ต้องเท่ากับ 100%)`);
    } else {
      setError('');
    }
  };

  const handleSave = () => {
    const total = tempData.reduce((sum, item) => sum + item.percentage, 0);
    if (total !== 100) {
      setError(`❌ รวมทั้งหมด ${total}% (ต้องเท่ากับ 100%)`);
      return;
    }
    onSave(tempData);
    onClose();
  };

  const getTotalPercentage = () => {
    return tempData.reduce((sum, item) => sum + item.percentage, 0);
  };

  const isValid = getTotalPercentage() === 100;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto card-base">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-black text-white p-6 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                <div>
                  <h2 className="text-xl font-bold">ปรับปรุงสาขาวิชา</h2>
                  <p className="text-gray-300 text-sm mt-1">ปรับเปอร์เซ็นต์ตามต้องการ</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                title="ปิด Dialog"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {tempData.map((item, index) => (
              <div
                key={index}
                className="bg-theme-gray-light rounded-lg p-4 border border-theme hover:border-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="font-semibold text-theme-primary text-sm">
                    {item.specialty}
                  </label>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border-2 border-gray-800">
                    <input
                      type="number"
                      value={item.percentage}
                      onChange={(e) => handleChange(index, parseFloat(e.target.value) || 0)}
                      className="w-16 outline-none text-center font-bold text-lg bg-transparent text-theme-primary"
                      min="0"
                      max="100"
                      title={`ปรับเปอร์เซ็นต์สำหรับ${item.specialty}`}
                    />
                    <span className="font-bold text-theme-primary">%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-theme-gray-medium rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gray-800 to-black h-full transition-all"
                    style={{ 
                      width: `${item.percentage}%`,
                      transitionDuration: '300ms'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div className={`rounded-lg p-4 border-2 transition-all ${
              isValid
                ? 'bg-gray-50 border-gray-300'
                : 'bg-gray-100 border-gray-400'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-theme-primary">รวมทั้งหมด:</span>
                <span className={`text-2xl font-bold ${
                  isValid ? 'text-theme-red-dark' : 'text-theme-red-darker'
                }`}>
                  {getTotalPercentage()}%
                </span>
              </div>
              {error && (
                <p className={`text-sm mt-2 font-semibold ${
                  isValid ? 'text-theme-red-dark' : 'text-theme-red-darker'
                }`}>
                  {error}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-gray-100 rounded-lg p-3 border border-gray-300">
              <p className="text-xs text-gray-800">
                <span className="font-bold">💡 หมายเหตุ:</span> ผลรวมต้องเท่ากับ 100% พอดี
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-theme-gray-light p-4 border-t border-theme flex gap-3 sticky bottom-0">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className={`btn-primary flex-1 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isValid ? 'บันทึกการเปลี่ยนแปลง' : 'ต้องปรับให้รวม 100% ก่อน'}
            >
              ✓ บันทึก
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
