'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-3 md:px-4 py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-theme-primary mb-3 md:mb-4">
              ระบบประมาณราคา
            </h1>
            <p className="text-base md:text-xl text-theme-secondary mb-2">
              ค่าออกแบบและค่าคุมงานก่อสร้าง
            </p>
            <p className="text-xs md:text-sm text-theme-secondary px-2">
              ตามกฎกระทรวง กำหนดอัตราค่าจ้างผู้ให้บริการงานจ้างออกแบบหรือควบคุมงานก่อสร้าง พ.ศ. 2562
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16 px-1 md:px-0">
            <Link href="/estimate">
              <div className="group cursor-pointer h-full">
                <div className="card-base border-l-4 border-l-gray-800 hover:shadow-lg p-5 md:p-8 transition-all duration-300 h-full bg-gradient-to-br from-white to-theme-light border-2 border-gray-800">
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">📐</div>
                    <h3 className="text-xl md:text-2xl font-bold text-theme-red-dark mb-2 md:mb-3">
                      ประเมินราคา
                    </h3>
                    <p className="text-theme-secondary mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                      ประเมินราคาก่อสร้างตามประเภทอาคารและพื้นที่
                    </p>
                    <div className="inline-flex items-center gap-2 text-theme-red-dark text-xs md:text-sm font-medium">
                      เริ่มได้เลย →
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/design">
              <div className="group cursor-pointer h-full">
                <div className="card-base border-l-4 border-l-gray-800 hover:shadow-lg p-5 md:p-8 transition-all duration-300 h-full bg-gradient-to-br from-white to-theme-light border-2 border-gray-800">
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">✏️</div>
                    <h3 className="text-xl md:text-2xl font-bold text-theme-red-dark mb-2 md:mb-3">
                      คำนวณค่าออกแบบ
                    </h3>
                    <p className="text-theme-secondary mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                      คำนวณค่าบริการออกแบบตามราคาโครงการและระดับความซับซ้อน
                    </p>
                    <div className="inline-flex items-center gap-2 text-theme-red-dark text-xs md:text-sm font-medium">
                      เริ่มคำนวณ →
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/supervision">
              <div className="group cursor-pointer h-full">
                <div className="card-base border-l-4 border-l-gray-800 hover:shadow-lg p-5 md:p-8 transition-all duration-300 h-full bg-gradient-to-br from-white to-theme-light border-2 border-gray-800">
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔍</div>
                    <h3 className="text-xl md:text-2xl font-bold text-theme-red-dark mb-2 md:mb-3">
                      คำนวณค่าคุมงาน
                    </h3>
                    <p className="text-theme-secondary mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                      คำนวณค่าบริการคุมงานก่อสร้างตามราคาโครงการและระดับความซับซ้อน
                    </p>
                    <div className="inline-flex items-center gap-2 text-theme-red-dark text-xs md:text-sm font-medium">
                      เริ่มคำนวณ →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-base p-6">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <span>📋</span> เอกสารอ้างอิง
              </h3>
              <div className="bg-theme-gray-light rounded-lg p-4 border border-theme">
                <p className="text-sm text-theme-primary mb-2">
                  กฎกระทรวง กำหนดอัตราค่าจ้างผู้ให้บริการงานจ้างออกแบบหรือควบคุมงานก่อสร้าง พ.ศ. 2562
                </p>
                <a 
                  href="https://legal.ops.moc.go.th/th/content/category/detail/id/502/iid/8618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-theme-red-dark hover:text-theme-red-darker underline font-semibold"
                >
                  ดูเอกสารฉบับเต็ม →
                </a>
                <p className="text-xs text-theme-secondary mt-2">
                  ที่มา: กลุ่มกฎหมาย สำนักงานปลัดกระทรวงพาณิชย์
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-theme-light border-t border-theme py-6 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-theme-primary">
              © 2025 ระบบประมาณราคาค่าออกแบบและค่าคุมงาน
            </p>
            <p className="text-xs text-theme-secondary mt-1">
              ข้อมูลอ้างอิงจากกฎกระทรวง พ.ศ. 2562
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
