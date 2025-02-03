'use client';
import type { SVGProps } from 'react';
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  DisabledIcon
} from '@/components/icons';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

const iconComponents: Record<string, IconComponent> = {
  success: SuccessIcon,
  info: InfoIcon,
  warning: WarningIcon,
  disabled: DisabledIcon
};

type TabIconProps = SVGProps<SVGSVGElement> & {
  icon: keyof typeof iconComponents;
  color?: string;
  size?: number;
};

export const TabIcon = ({
  icon,
  color,
  size = 24,
  ...props
}: Readonly<TabIconProps>) => {
  const Icon = iconComponents[icon] || SuccessIcon;

  return <Icon width={size} height={size} style={{ color }} {...props} />;
};
