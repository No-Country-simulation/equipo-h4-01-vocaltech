import { VocalTechIcon } from '@/components/icons';
import Link from 'next/link';

interface Props {
  theme?: 'primary' | 'secondary';
}

export const VocaltechLogo: React.FC<Props> = ({ theme }) => {
  let themeClass = '';
  if (theme === 'primary') {
    themeClass = 'text-primary';
  } else if (theme === 'secondary') {
    themeClass = 'text-secondary';
  }

  return (
    <Link href="/">
      <span className={`flex justify-center items-center gap-2 ${themeClass}`}>
        <VocalTechIcon />
        VocalTech
      </span>
    </Link>
  );
};
