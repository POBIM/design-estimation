'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function EstimatePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-theme-light to-white pt-8">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-theme-primary mb-4">
            ข้อมูลราคา
          </h1>
          <p className="text-xl text-theme-secondary mb-8">
            เลือกวิธีการบ่อยนี้เพื่อเริ่มต้นการคำนวณค่าออกแบบ
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Option 1: Construction Estimation */}
          <Link href="/estimate/construction">
            <div className="card-base h-full cursor-pointer hover:shadow-lg transition transform hover:scale-105">
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-theme-primary mb-3">
                  ประเมินราคาก่อสร้าง
                </h2>
                <p className="text-theme-secondary mb-4">
                  เลือกประเภทอาคารและพื้นที่ใช้สอยเพื่อได้ราคาประมาณการ
                </p>
                <p className="text-sm text-theme-gray-darker">
                  ข้อมูลปี 2568 ครบทั้ง 53 รายการ
                </p>
              </div>
            </div>
          </Link>

          {/* Option 2: Direct Input */}
          <Link href="/design">
            <div className="card-base h-full cursor-pointer hover:shadow-lg transition transform hover:scale-105">
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-theme-gray-darker to-theme-gray-medium rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-theme-primary mb-3">
                  กรอกราคาโดยตรง
                </h2>
                <p className="text-theme-secondary mb-4">
                  กรอกราคาก่อสร้างโดยตรงและคำนวณค่าออกแบบทันที
                </p>
                <p className="text-sm text-theme-gray-darker">
                  สำหรับผู้ที่มีราคา k้อบสร้างแล้ว
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
