import { NoCountryIcon } from '@/components/icons';
import Link from 'next/link';

export const NoCountryLogo = () => {
  return (
    <Link href="/">
      <span className="flex text-white items-center gap-2">
        <NoCountryIcon />
        <span className="font-medium">No Country</span>
      </span>
    </Link>
  );
};
