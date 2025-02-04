'use client';
import { TabsContent } from '@/components/ui';
import { ReactNode } from 'react';

interface ContentTabsProps {
  value: string;
  children?: ReactNode;
}

export const ContentTabs = ({ value, children }: ContentTabsProps) => {
  return (
    <TabsContent value={value} className="p-6">
      {children}
    </TabsContent>
  );
};
