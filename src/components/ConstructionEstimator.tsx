'use client';

import { useState } from 'react';
import Image from 'next/image';
import { buildingTypes, BuildingType } from '@/utils/buildingData';

interface EstimationResult {
  buildingType: BuildingType;
  area: number;
  priceLevel: 'low' | 'mid' | 'high';
  estimatedCost: number;
}

export default function ConstructionEstimator() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [area, setArea] = useState<string>('');
  const [priceLevel, setPriceLevel] = useState<'low' | 'mid' | 'high'>('mid');
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredBuildings = buildingTypes.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCalculate = () => {
    if (!selectedBuilding || !area || isNaN(Number(area))) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const areaNum = Number(area);
    const price = 
      priceLevel === 'low' ? selectedBuilding.priceLow :
      priceLevel === 'mid' ? selectedBuilding.priceMid :
      selectedBuilding.priceHigh;

    const estimatedCost = areaNum * price;

    setResult({
      buildingType: selectedBuilding,
      area: areaNum,
      priceLevel,
      estimatedCost,
    });
  };

  const handleUseEstimation = () => {
    if (result) {
      // Save to localStorage or pass to calculator
      localStorage.setItem('estimatedConstructionCost', String(result.estimatedCost));
      window.location.href = '/design';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-light to-white pt-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-theme-primary mb-2 text-center">
          ระบบประเมินราคาก่อสร้าง
        </h1>
        <p className="text-center text-theme-secondary mb-8">ตามข้อมูล ปี 2568</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="card-base">
            <h2 className="text-2xl font-bold text-theme-primary mb-6">
              เลือกข้อมูลโครงการ
            </h2>

            {/* Building Type Selection */}
            <div className="mb-6">
              <label className="block text-theme-primary font-semibold mb-3">
                ประเภทอาคาร
              </label>
              <input
                type="text"
                placeholder="ค้นหาประเภทอาคาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-theme w-full mb-3"
              />
              <div className="border border-theme-gray-medium rounded-lg max-h-64 overflow-y-auto">
                {filteredBuildings.map((building) => (
                  <button
                    key={building.id}
                    onClick={() => {
                      setSelectedBuilding(building);
                      setSearchTerm('');
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-theme-gray-light hover:bg-theme-light transition ${
                      selectedBuilding?.id === building.id
                        ? 'bg-theme-red-light border-l-4 border-l-theme-red-dark'
                        : ''
                    }`}
                  >
                    <div className="font-semibold text-theme-primary">
                      {building.id}. {building.name}
                    </div>
                    <div className="text-sm text-theme-secondary mt-1">
                      ต่ำ: {building.priceLow.toLocaleString()} | 
                      กลาง: {building.priceMid.toLocaleString()} | 
                      สูง: {building.priceHigh.toLocaleString()} บาท/ตร.ม.
                    </div>
                  </button>
                ))}
              </div>
              {selectedBuilding && (
                <div className="mt-3 p-3 bg-theme-red-light border border-theme-red-medium rounded-lg">
                  <p className="text-theme-red-dark font-semibold">
                    ✓ {selectedBuilding.name}
                  </p>
                </div>
              )}
            </div>

            {/* Area Input */}
            <div className="mb-6">
              <label className="block text-theme-primary font-semibold mb-3">
                พื้นที่ใช้สอย (ตร.ม.)
              </label>
              <input
                type="number"
                placeholder="กรอกพื้นที่..."
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="input-theme w-full"
                min="0"
                step="0.01"
              />
            </div>

            {/* Price Level Selection */}
            <div className="mb-6">
              <label className="block text-theme-primary font-semibold mb-3">
                ระดับราคา
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'mid', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setPriceLevel(level)}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      priceLevel === level
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                        : 'bg-theme-gray-light text-theme-primary hover:bg-theme-gray-medium border border-theme-gray-medium'
                    }`}
                  >
                    {level === 'low' ? 'ต่ำ' : level === 'mid' ? 'กลาง' : 'สูง'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="btn-primary w-full py-3 text-lg font-semibold"
            >
              คำนวณราคาประมาณการ
            </button>
          </div>

          {/* Result Section */}
          <div>
            {result ? (
              <div className="card-base sticky top-8">
                <h2 className="text-2xl font-bold text-theme-primary mb-6">
                  ผลการประมาณการ
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-theme-secondary text-sm">ประเภทอาคาร</p>
                    <p className="text-lg font-semibold text-theme-primary">
                      {result.buildingType.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-theme-secondary text-sm">พื้นที่ใช้สอย</p>
                    <p className="text-lg font-semibold text-theme-primary">
                      {result.area.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{' '}
                      ตร.ม.
                    </p>
                  </div>

                  <div>
                    <p className="text-theme-secondary text-sm">
                      อัตราราคา ({result.priceLevel === 'low' ? 'ต่ำ' : result.priceLevel === 'mid' ? 'กลาง' : 'สูง'})
                    </p>
                    <p className="text-lg font-semibold text-theme-primary">
                      {(result.priceLevel === 'low'
                        ? result.buildingType.priceLow
                        : result.priceLevel === 'mid'
                        ? result.buildingType.priceMid
                        : result.buildingType.priceHigh
                      ).toLocaleString()}{' '}
                      บาท/ตร.ม.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-theme-gray-medium">
                    <p className="text-theme-secondary text-sm mb-2">ราคาประมาณการก่อสร้าง</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                      ฿{result.estimatedCost.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleUseEstimation}
                    className="btn-primary w-full py-3 font-semibold"
                  >
                    ใช้ราคานี้สำหรับคำนวณค่าออกแบบ
                  </button>
                  <button
                    onClick={() => {
                      setResult(null);
                      setSelectedBuilding(null);
                      setArea('');
                      setSearchTerm('');
                    }}
                    className="btn-secondary w-full py-3 font-semibold"
                  >
                    ประเมินอีกครั้ง
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-base h-full flex items-center justify-center min-h-96">
                <div className="text-center">
                  <p className="text-theme-secondary text-lg mb-4">
                    กรอกข้อมูลด้านซ้ายแล้วกดปุ่ม "คำนวณราคาประมาณการ"
                  </p>
                  <p className="text-theme-gray-darker text-sm">
                    จะแสดงผลประมาณราคาก่อสร้างตามข้อมูล ปี 2568
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Reference Image */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-theme-primary mb-6 text-center">
            📊 ตารางอ้างอิงราคาก่อสร้าง ปี 2568
          </h2>
          <div className="card-base p-6">
            <Image
              src="/Price.jpg"
              alt="ตารางราคาก่อสร้างปี 2568"
              width={1200}
              height={800}
              quality={95}
              priority={false}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-center text-theme-secondary text-sm mt-4">
            ที่มา: กฎกระทรวง กำหนดอัตราราคาก่อสร้าง ปี 2568
          </p>
        </div>
      </div>
    </div>
  );
}
