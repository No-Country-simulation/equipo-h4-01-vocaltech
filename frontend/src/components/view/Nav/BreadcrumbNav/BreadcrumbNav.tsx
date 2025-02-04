'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbNavProps {
  tabTitle: string;
  sectionTitle: string;
}

export const BreadcrumbNav = ({
  tabTitle,
  sectionTitle
}: BreadcrumbNavProps) => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    return pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return { href, label: segment.replace(/-/g, ' ') };
    });
  }, [pathname]);

  const visibleBreadcrumbs = breadcrumbs.slice(-3);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="flex items-center hover:text-primary">
        <Home className="h-4 w-4" />
        <span className="ml-1">Home </span>
      </Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      {visibleBreadcrumbs.map(({ href, label }, index) => (
        <Link
          key={href}
          href={href}
          className="flex items-center hover:text-primary"
        >
          <span>{label}</span>
          {index < visibleBreadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2" />
          )}
        </Link>
      ))}
      <ChevronRight className="h-4 w-4 mx-2" />
      <span className="font-medium">{tabTitle}</span>
      {sectionTitle && (
        <>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-primary">{sectionTitle}</span>
        </>
      )}
    </nav>
  );
};
