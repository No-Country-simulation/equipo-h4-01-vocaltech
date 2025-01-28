import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button
} from '@/components/ui';
import { ReactNode, ElementType } from 'react';
//import { Icon } from './Icon'; // Componente de iconos personalizado

type DialogType = 'success' | 'warning' | 'info' | 'error' | 'custom';
type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: ElementType;
  type?: DialogType;
  size?: DialogSize;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

const typeStyles: Record<DialogType, string> = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  custom: ''
};

const sizeStyles: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
};

export const DialogContainer = ({
  open,
  onOpenChange,
  title,
  description,
  icon: IconComponent,
  type = 'info',
  size = 'md',
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  onConfirm,
  onCancel,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true
}: DialogProps) => {
  const handleOpenChange = (newOpen: boolean) => {
    if (!closeOnOverlayClick && !newOpen) return;
    onOpenChange(newOpen);
  };

  return (
    <ShadcnDialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={`${sizeStyles[size]} relative`}>
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            ×
          </button>
        )}

        <DialogHeader>
          {IconComponent && (
            <div className="flex justify-center mb-4">
              <IconComponent className={`w-12 h-12 ${typeStyles[type]}`} />
            </div>
          )}
          <DialogTitle className={`text-center ${typeStyles[type]}`}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center pt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        <DialogFooter className="gap-2 mt-4">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button onClick={onConfirm} className={typeStyles[type]}>
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
};
