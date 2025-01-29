export interface IconProps {
  name: string;
  library?: 'lucide' | 'radix' | 'custom';
  size?: number | string;
  ariaLabel?: string;
  className?: string;
}

export type SavedTabState = {
  active: number;
  tabs: Omit<TabConfig, 'content'>[];
};

export interface TabsNavigationProps {
  tabs: TabConfig[];
  activeTab: number;
  hidden?: boolean;
  setActiveTab: (index: number) => void;
}

export type FieldType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'yesno'
  | 'rating';

export type FieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
};

export type FieldOption = {
  value: string;
  label: string;
};

export type FormField = {
  id: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  validation?: FieldValidation;
  placeholder?: string;
  dependencies?: string[];
  conditional?: (values: any) => boolean;
};

export interface SecctionProps {
  secctionTitle?: string;
  questions: FormField[];
}

export type TabConfig = {
  id: string;
  title: string;
  icon?: string;
  color?: string;
  fields: SecctionProps[] | [];
  completed: boolean;
  disabled: boolean;
  status: 'valid' | 'invalid' | 'pending' | 'error' | 'disabled';
};

export interface TabLabelProps {
  icon?: string;
  color?: string;
  title: string;
  disabled: boolean;
  hidden?: boolean;
  status: TabConfig['status'];
}
