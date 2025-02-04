export interface TabsProps {
  id: string;
  title: string;
  icon?: string;
  color?: string;
  content: ContentProps[];
  completed: boolean;
  disabled: boolean;
  status: TypeStatus;
}

export interface ContentProps {
  id: string;
  title: string;
  type: string;
  value: ValueProps[];
}

export interface ValueProps {
  id: string;
  text: string;
  type: TypeValue;
  required: boolean;
  placeholder?: string;
  options?: OptionValuaProps[];
}

export interface OptionValuaProps {
  value: string;
  label: string;
}

export type TypeStatus = 'valid' | 'invalid' | 'pending' | 'error' | 'disabled';

export type TypeValue =
  | 'text'
  | 'number'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'yesno'
  | 'rating';
