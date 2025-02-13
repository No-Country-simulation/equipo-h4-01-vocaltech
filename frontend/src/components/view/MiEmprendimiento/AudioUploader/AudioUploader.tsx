'use client';

import { type FC, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

interface AudioUploaderProps {
  onUpload: (file: File) => void;
}

export const AudioUploader: FC<AudioUploaderProps> = ({ onUpload }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    if (file.type !== 'audio/mpeg') {
      setUploadError('Solo se permiten archivos MP3');
      return;
    }

    try {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.onloadedmetadata = () => {
        if (audio.duration > 60) {
          setUploadError('El audio no puede ser mayor a 1 minuto');
          return;
        }

        onUpload(file);
        setUploadDialogOpen(false);
      };
    } catch (error) {
      setUploadError('Error al procesar el archivo de audio');
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        className="bg-[#8B5CF6] text-white hover:bg-[#7C3AED] px-3"
        onClick={() => setUploadDialogOpen(true)}
      >
        <Upload className="h-4 w-4" />
      </Button>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subir audio</DialogTitle>
            <DialogDescription>
              Sube un archivo de audio MP3 de hasta 1 minuto
            </DialogDescription>
          </DialogHeader>
          <Input
            ref={fileInputRef}
            type="file"
            accept="audio/mpeg"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
