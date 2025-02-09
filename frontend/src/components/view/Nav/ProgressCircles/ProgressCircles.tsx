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
    <div className="flex items-center justify-center gap-2 text-deepblue">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-6 h-6 p-3 rounded-full flex items-center justify-center text-base/10 font-normal border-2',
            index + 1 < currentStep
              ? 'bg-deepblue border-deepblue text-deepblue'
              : index + 1 === currentStep
                ? 'border-deepblue text-deepblue'
                : 'border-lavender text-lavender',
            'transition-all duration-300 hover:border-deepblue hover:text-deepblue'
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
