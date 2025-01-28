import { Separator } from '@/components/ui';
import Link from 'next/link';

export function ContactSection() {
  return (
    <div className="flex items-start gap-4">
      <Separator orientation="vertical" className="h-20 bg-white/20" />
      <div className="text-left text-white">
        <div className="font-medium mb-2">Contacto</div>
        <Link
          href="http://www.inesmonescazon.com.ar"
          className="block text-sm hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.inesmonescazon.com.ar
        </Link>
        <span className="block text-sm">nocountry.tech</span>
      </div>
    </div>
  );
}
