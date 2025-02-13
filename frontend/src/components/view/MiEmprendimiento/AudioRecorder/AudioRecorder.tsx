'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Loader2,
  X,
  Check,
  Upload,
  Play,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui';
import { Alert, AlertDescription } from '@/components/ui/alert';
//import { useFormStore } from '../store/form-store';
//import { useToast } from '@/components/ui/use-toast';
//import { AudioInfo } from './audio-info';
import { useFormStore } from '../MiEmpStore/MiEmpStore';
import { useToast } from '@/hooks';
import { AudioInfo } from '../AudioInfo/AudioInfo';

const user = 'dc';

const getAudioDuration = (file: File): Promise<number> => {
  return new Promise(resolve => {
    const audio = new Audio();
    audio.onloadedmetadata = () => resolve(audio.duration);
    audio.src = URL.createObjectURL(file);
  });
};

export function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timeInterval = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    formData,
    setAudioUrl,
    resetAudio,
    setAudioFileName,
    setAudioDuration,
    setAudioType
  } = useFormStore();
  const { toast } = useToast();

  const startRecording = async () => {
    if (formData.audioUrl) {
      setShowConfirmDialog(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = e => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mpeg' });
        setAudioBlob(blob);
        setAudioType('audio/mp3');
        setAudioDuration(recordingTime);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timeInterval.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            toast({
              title: 'Tiempo límite alcanzado',
              description: 'La grabación se ha detenido al alcanzar 1 minuto',
              variant: 'destructive'
            });
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo acceder al micrófono',
        variant: 'destructive'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    }
  };

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

        setAudioBlob(file);
        setAudioType('audio/mpeg');
        setAudioDuration(audio.duration);
        setRecordingTime(Math.floor(audio.duration));

        if (formData.audioUrl) {
          setShowConfirmDialog(true);
        } else {
          handleSubmit(file);
        }
        setUploadDialogOpen(false);
      };
    } catch (error) {
      setUploadError('Error al procesar el archivo de audio');
    }
  };

  const handleSubmit = async (blob?: Blob) => {
    const audioToSubmit = blob || audioBlob;
    if (!audioToSubmit) return;

    setIsSubmitting(true);
    try {
      const duration =
        audioToSubmit instanceof File
          ? await getAudioDuration(audioToSubmit)
          : recordingTime;
      setAudioDuration(duration);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const audioUrl = URL.createObjectURL(audioToSubmit);
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${user}_${currentDate}_${Math.random().toString(36).substr(2, 9)}`;
      setAudioUrl(audioUrl);
      setAudioFileName(fileName);
      setIsDialogOpen(false);
      setUploadDialogOpen(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmReplace = () => {
    resetAudio();
    if (audioBlob) {
      handleSubmit(audioBlob);
    } else {
      startRecording();
    }
    setShowConfirmDialog(false);
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setAudioDuration(null);
    setAudioType(null);
  };

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDeleteAudio = () => {
    if (formData.audioUrl) {
      URL.revokeObjectURL(formData.audioUrl);
    }
    resetAudio();
    setIsPlaying(false);
    setAudioBlob(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: 'Éxito',
      description: 'Audio eliminado correctamente'
    });
  };

  useEffect(() => {
    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
      if (formData.audioUrl) {
        URL.revokeObjectURL(formData.audioUrl);
      }
    };
  }, [formData.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (isDialogOpen && formData.audioUrl && formData.audioDuration) {
      setRecordingTime(Math.floor(formData.audioDuration));
    }
  }, [isDialogOpen, formData.audioUrl, formData.audioDuration]);

  return (
    <div className="space-y-4">
      {formData.audioUrl && (
        <div className="flex flex-col p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handlePlayAudio}
              >
                <Play
                  className={`h-4 w-4 ${isPlaying ? 'text-primary' : ''}`}
                />
              </Button>
              <span className="text-sm font-medium">
                {formData.audioFileName}
              </span>
              <audio
                ref={audioRef}
                src={formData.audioUrl}
                className="hidden"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-destructive"
              onClick={handleDeleteAudio}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <AudioInfo
            duration={formData.audioDuration ?? 0}
            type={formData.audioType || 'audio/mpeg'}
          />
        </div>
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
        <Button
          type="button"
          variant="secondary"
          className="bg-[#8B5CF6] text-white hover:bg-[#7C3AED] px-3"
          onClick={() => setUploadDialogOpen(true)}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grabar audio</DialogTitle>
            <DialogDescription>
              Graba un mensaje de voz de hasta 1 minuto
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4 py-4">
            {recordingTime > 0 && (
              <div className="text-2xl font-mono">
                {Math.floor(recordingTime / 60)}:
                {(recordingTime % 60).toString().padStart(2, '0')}
              </div>
            )}

            {audioBlob ? (
              <>
                <audio
                  src={URL.createObjectURL(audioBlob)}
                  controls
                  className="w-full"
                />
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={resetRecording}
                    disabled={isSubmitting}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Grabar otro
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    Guardar audio
                  </Button>
                </div>
                {formData.audioDuration !== null && formData.audioType && (
                  <AudioInfo
                    duration={formData.audioDuration}
                    type={formData.audioType}
                  />
                )}
              </>
            ) : (
              <Button
                variant={isRecording ? 'destructive' : 'default'}
                onClick={isRecording ? stopRecording : startRecording}
                size="lg"
                className="rounded-full w-16 h-16"
              >
                {isRecording ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>

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
}
