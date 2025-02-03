'use client';
import { TabsContent } from '@/components/ui';
import { ReactNode } from 'react';

interface ContentTabsProps {
  id: string;
  children?: ReactNode;
}

export const ContentTabs = ({ id, children }: ContentTabsProps) => {
  return (
    <TabsContent value={id} className="p-6">
      {children}
    </TabsContent>
  );
};
