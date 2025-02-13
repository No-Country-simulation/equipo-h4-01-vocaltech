import type { FC } from 'react';

interface AudioInfoProps {
  duration: number;
  type: string;
}

export const AudioInfo: FC<AudioInfoProps> = ({ duration, type }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-sm text-muted-foreground mt-2">
      <span className="font-medium">Duración:</span> {formatDuration(duration)}{' '}
      | <span className="font-medium">Tipo:</span> {type}
    </div>
  );
};
