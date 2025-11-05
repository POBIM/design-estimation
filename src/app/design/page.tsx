import Navbar from '@/components/Navbar';
import Calculator from '@/components/Calculator';

export default function DesignPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Calculator serviceType="design" />
          </div>
        </div>
      </main>

      <footer className="bg-theme-light border-t border-theme py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-theme-primary">
            © 2025 ระบบประมาณราคาค่าออกแบบและค่าคุมงาน
          </p>
          <p className="text-xs text-theme-secondary mt-1">
            ข้อมูลอ้างอิงจากกฎกระทรวง พ.ศ. 2562
          </p>
        </div>
      </footer>
    </>
  );
}
