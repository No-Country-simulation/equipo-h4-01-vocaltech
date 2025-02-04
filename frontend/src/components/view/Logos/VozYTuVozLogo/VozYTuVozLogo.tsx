import { VozYTuVozIcon } from '@/components/icons';
import Link from 'next/link';

export const VozYTuVozLogo = () => {
  return (
    <Link href="/">
      <span className="flex text-white justify-center item-center gap-2">
        <VozYTuVozIcon />
        <span></span>
      </span>
    </Link>
  );
};
