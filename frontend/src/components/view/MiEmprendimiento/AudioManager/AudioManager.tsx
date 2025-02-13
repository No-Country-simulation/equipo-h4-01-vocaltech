'use client';

import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui';
import { useFormStore } from '../MiEmpStore/MiEmpStore';
import { useToast } from '@/hooks';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { AudioUploader } from '../AudioUploader/AudioUploader';
import { AudioRecorder } from '../AudioRecorder/AudioRecorder';

const user = 'vocalthech';

export const AudioManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tempAudioBlob, setTempAudioBlob] = useState<Blob | null>(null);
  const [tempAudioDuration, setTempAudioDuration] = useState<number | null>(
    null
  );
  const { formData, setAudioUrl, resetAudio, setAudioFileName } =
    useFormStore();
  const { toast } = useToast();

  const handleSubmit = async (blob: Blob, duration: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const audioUrl = URL.createObjectURL(blob);
      const fileName = `${user}_${new Date().toISOString().split('T')[0]}`;
      setAudioUrl(audioUrl);
      setAudioFileName(fileName);
      setIsDialogOpen(false);
      toast({
        title: 'Éxito',
        description: 'Audio guardado correctamente'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar el audio',
        variant: 'destructive'
      });
    }
  };

  const handleConfirmReplace = () => {
    if (tempAudioBlob && tempAudioDuration !== null) {
      handleSubmit(tempAudioBlob, tempAudioDuration);
    }
    setShowConfirmDialog(false);
  };

  const handleDeleteAudio = () => {
    if (formData.audioUrl) {
      URL.revokeObjectURL(formData.audioUrl);
    }
    resetAudio();
    toast({
      title: 'Éxito',
      description: 'Audio eliminado correctamente'
    });
  };

  const handleNewAudio = (blob: Blob, duration: number) => {
    if (formData.audioUrl) {
      setTempAudioBlob(blob);
      setTempAudioDuration(duration);
      setShowConfirmDialog(true);
    } else {
      handleSubmit(blob, duration);
    }
  };

  return (
    <div className="space-y-4">
      {formData.audioUrl && (
        <AudioPlayer
          audioUrl={formData.audioUrl}
          fileName={formData.audioFileName || ''}
          duration={formData.audioDuration || 0}
          type={formData.audioType || 'audio/mp3'}
          onDelete={handleDeleteAudio}
        />
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
          onClick={() => setIsDialogOpen(true)}
        >
          Quiero enviar un audio
        </Button>
        <AudioUploader onUpload={file => handleNewAudio(file, file.size)} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grabar audio</DialogTitle>
            <DialogDescription>
              Graba un mensaje de voz de hasta 1 minuto
            </DialogDescription>
          </DialogHeader>

          <AudioRecorder />

          {formData.audioUrl && (
            <Alert>
              <AlertDescription>
                Ya tienes un audio guardado. Si grabas uno nuevo, el anterior se
                eliminará.
              </AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar reemplazo</DialogTitle>
            <DialogDescription>
              Ya tienes un audio guardado. ¿Deseas reemplazarlo con uno nuevo?
              El audio actual se eliminará.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirmReplace}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
