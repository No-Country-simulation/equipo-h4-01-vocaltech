import { CheckCircle2 } from 'lucide-react';
import { DialogContainer } from '../DialogContainer/DialogContainer';

export const DialogSuccess = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => (
  <DialogContainer
    open={open}
    onOpenChange={onClose}
    title="¡Formulario enviado!"
    description="Los datos han sido guardados exitosamente."
    icon={CheckCircle2}
    type="success"
    confirmText="Volver al inicio"
    onConfirm={onClose}
    showCloseButton={false}
    closeOnOverlayClick={false}
  />
);
