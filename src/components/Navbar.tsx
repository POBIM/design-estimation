'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { 
      href: '/', 
      label: 'หน้าหลัก',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      href: '/estimate', 
      label: 'ประเมินราคา',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      href: '/design', 
      label: 'ค่าออกแบบ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    { 
      href: '/supervision', 
      label: 'ค่าควบคุมงาน',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-theme sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-4 flex items-center justify-between">
        <Link href="/" className="text-lg md:text-2xl font-bold text-theme-red-dark">
          <span className="hidden md:inline">Design Est.</span>
          <span className="md:hidden">DE</span>
        </Link>

        <div className="flex gap-0.5 md:gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`px-2 md:px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'text-theme-primary hover:bg-theme-light'
                }`}
              >
                <span className="md:hidden">{link.icon}</span>
                <span className="hidden md:inline text-sm lg:text-base">{link.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
