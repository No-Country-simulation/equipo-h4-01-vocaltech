import { Card } from '@/components/ui/card';

interface FormCardProps {
  children: React.ReactNode;
}

export const FormCard = ({ children }: FormCardProps) => {
  return <Card className="w-full h-100vp max-w-3xl mx-auto">{children}</Card>;
};
