'use client';

import { type FC, useRef, useState } from 'react';
import { Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioInfo } from '../AudioInfo/AudioInfo';

interface AudioPlayerProps {
  audioUrl: string;
  fileName: string;
  duration: number;
  type: string;
  onDelete: () => void;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  audioUrl,
  fileName,
  duration,
  type,
  onDelete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
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
            <Play className={`h-4 w-4 ${isPlaying ? 'text-primary' : ''}`} />
          </Button>
          <span className="text-sm font-medium">{fileName}</span>
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <AudioInfo duration={duration} type={type} />
    </div>
  );
};
