import { AlertTriangle } from 'lucide-react';
import { DialogContainer } from '..';

export const DialogConfirmation = ({
  open,
  onConfirm,
  onCancel
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <DialogContainer
    open={open}
    onOpenChange={onCancel}
    title="Confirmar envío"
    description="¿Estás seguro de que deseas enviar el formulario?"
    icon={AlertTriangle}
    type="warning"
    size="lg"
    cancelText="Revisar nuevamente"
    confirmText="Sí, enviar"
    showCloseButton={true}
    closeOnOverlayClick={false}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
