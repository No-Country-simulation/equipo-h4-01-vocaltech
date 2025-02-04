import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressCirclesProps {
  totalSteps: number;
  currentStep: number;
}

export const ProgressCircles = ({
  totalSteps,
  currentStep
}: ProgressCirclesProps) => {
  if (totalSteps <= 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-xs border-2',
            index + 1 < currentStep
              ? 'bg-primary border-primary text-primary-foreground'
              : index + 1 === currentStep
                ? 'border-primary text-primary'
                : 'border-muted text-muted-foreground',
            'transition-all duration-300 hover:border-primary hover:text-primary'
          )}
        >
          {index + 1 < currentStep ? (
            <Check className="h-3 w-3 animate-in fade-in" />
          ) : (
            index + 1
          )}
        </div>
      ))}
    </div>
  );
};
