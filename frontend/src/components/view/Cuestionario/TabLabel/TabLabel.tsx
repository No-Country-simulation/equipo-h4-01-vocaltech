'use client';
import { FC } from 'react';
import * as LucideIcons from 'lucide-react';
import { StatusType } from '../TabType/TabType';

interface TabLabelProps {
  icon?: string;
  color?: string;
  title: string;
  disabled?: boolean;
  status: StatusType;
  hidden?: boolean;
}

const statusIcons: Record<StatusType, string> = {
  [StatusType.Valid]: 'CheckCircle',
  [StatusType.Invalid]: 'AlertCircle',
  [StatusType.Pending]: 'Info',
  [StatusType.Error]: 'XCircle',
  [StatusType.Disabled]: 'MinusCircle'
};

const statusColors: Record<StatusType, string> = {
  [StatusType.Valid]: '#50A5A1',
  [StatusType.Invalid]: '#F75F57',
  [StatusType.Pending]: '#040042',
  [StatusType.Error]: '#ff0000',
  [StatusType.Disabled]: '#A9A6E4'
};

export const TabLabel: FC<TabLabelProps> = ({
  icon,
  color,
  title,
  disabled,
  status,
  hidden
}) => {
  if (hidden) return null;

  const IconComponent = (LucideIcons as any)[icon || statusIcons[status]];
  const iconColor = disabled
    ? statusColors[StatusType.Disabled]
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
