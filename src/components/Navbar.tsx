'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'หน้าหลัก' },
    { href: '/estimate', label: 'ประเมินราคา' },
    { href: '/design', label: 'ค่าออกแบบ' },
    { href: '/supervision', label: 'ค่าควบคุมงาน' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-theme sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-theme-red-dark">
          Design Est.
        </Link>

        <div className="flex gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'text-theme-primary hover:bg-theme-light'
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
