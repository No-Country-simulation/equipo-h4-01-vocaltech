'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Alert,
  AlertDescription
} from '@/components/ui';

import { useToast } from '@/hooks';
import { useFormStore } from '@/store/from/from.store';

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timeInterval = useRef<NodeJS.Timeout | null>(null);
  const { formData, setAudioUrl } = useFormStore();
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = e => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
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

  const handleSubmit = async () => {
    if (!audioBlob) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
  };

  useEffect(() => {
    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    };
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => setIsDialogOpen(true)}
      >
        Quiero enviar un audio
      </Button>

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
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    Guardar audio
                  </Button>
                </div>
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
    </>
  );
};
