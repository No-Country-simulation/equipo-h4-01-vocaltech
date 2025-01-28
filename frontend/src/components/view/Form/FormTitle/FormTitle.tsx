import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const FormTitle = () => {
  return (
    <div className="flex items-center space-x-5 mb-6">
      <Link href="/">
        <ChevronLeft className="h-7 w-6" />
      </Link>
      <span className="text-l font-semibold">
        Quiero obtener mi diagnóstico.
      </span>
    </div>
  );
};
