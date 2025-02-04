import type { SVGProps } from 'react';

export function NoCountryIcon(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" {...props}>
      <path
        d="M8.87.278c-.915 2.933 1.326 6.05 4.66 4.698C16.231 3.88 15.125.278 15.405.278h8.87v8.07c0 .364 5.504-.885 5.182 3.817-.266 3.821-5.182 2.587-5.182 2.91v8.07H0V.277h8.87z"
        fill="currentColor"
      />
    </svg>
  );
}
