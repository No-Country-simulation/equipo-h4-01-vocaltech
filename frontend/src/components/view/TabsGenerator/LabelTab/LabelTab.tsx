'use client';
import * as LucideIcons from 'lucide-react';
import { TabsProps } from '../TypeTabs/TypeTabs';

const statusIcons: Record<TabsProps['status'], string> = {
  valid: 'CheckCircle',
  invalid: 'AlertCircle',
  pending: 'Info',
  error: 'XCircle',
  disabled: 'MinusCircle'
};

const statusColors: Record<TabsProps['status'], string> = {
  valid: '#50A5A1',
  invalid: '#F75F57',
  pending: '#040042',
  error: '#ff0000',
  disabled: '#A9A6E4'
};

interface LabelTabProps {
  tab: TabsProps;
  hidden?: boolean;
}

export const LabelTab = ({ tab, hidden }: LabelTabProps) => {
  if (hidden) return null;
  const { title, disabled, status } = tab;
  let icon = statusIcons[status || ' pending'];
  let color = statusColors[status || ' pending'];
  const IconComponent = (LucideIcons as any)[icon || statusIcons.pending];
  const iconColor = disabled
    ? statusColors.disabled
    : color || statusColors.pending;

  return (
    <div className="flex justify-center items-center gap-3 w-full">
      {IconComponent && (
        <IconComponent
          className="w-5 h-5 shrink-0"
          style={{ color: iconColor }}
        />
      )}
      <span
        className="truncate text-sm font-medium"
        style={{ color: iconColor }}
      >
        {title}
      </span>
    </div>
  );
};
