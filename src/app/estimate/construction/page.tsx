import Navbar from '@/components/Navbar';
import ConstructionEstimator from '@/components/ConstructionEstimator';

export const metadata = {
  title: 'ประเมินราคาก่อสร้าง | Design Estimation',
};

export default function ConstructionEstimatePage() {
  return (
    <>
      <Navbar />
      <ConstructionEstimator />
    </>
  );
}
