'use client';
import * as LucideIcons from 'lucide-react';
import { TabConfig, TabLabelProps } from '../TabType/TabType';

const statusIcons: Record<TabConfig['status'], string> = {
  valid: 'CheckCircle',
  invalid: 'AlertCircle',
  pending: 'Info',
  error: 'XCircle',
  disabled: 'MinusCircle'
};

const statusColors: Record<TabConfig['status'], string> = {
  valid: '#50A5A1',
  invalid: '#F75F57',
  pending: '#040042',
  error: '#ff0000',
  disabled: '#A9A6E4'
};

export const TabLabel = ({
  icon,
  color,
  title,
  disabled,
  status,
  hidden
}: TabLabelProps) => {
  if (hidden) return null;
  const IconComponent = (LucideIcons as any)[icon || statusIcons[status]];
  const iconColor = disabled
    ? statusColors.disabled
    : color || statusColors[status];

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
