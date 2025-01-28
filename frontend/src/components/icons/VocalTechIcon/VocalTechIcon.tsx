import type { SVGProps } from 'react';

export function VocalTechIcon(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      fill="none"
      {...props}
    >
      <path
        d="M28.786 24.04h-.975v2.57a6.092 6.092 0 01-6.093 6.092h-2.671a6.092 6.092 0 01-6.092-6.092V12.82a6.092 6.092 0 016.092-6.092h2.671a6.092 6.092 0 016.093 6.092v6.57l.24.276 3.808 4.374h-3.073z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5.214 18.492h.975v2.515a6.092 6.092 0 006.092 6.093h2.672a6.092 6.092 0 006.092-6.092V7.39a6.092 6.092 0 00-6.092-6.092h-2.672A6.092 6.092 0 006.19 7.39V13.88l-.241.276-3.798 4.336h3.064z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
