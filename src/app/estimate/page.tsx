'use client';

import { useEffect } from 'react';

export default function EstimatePage() {
  useEffect(() => {
    // Redirect to /estimate/construction
    window.location.href = '/estimate/construction';
  }, []);

  return null;
}
