'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { Upload } from 'lucide-react';

interface PhotoUploadProps {
  onImageChange?: (file: File) => void;
}

export const AvatarUploader = ({ onImageChange }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange?.(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32">
        <div
          className={`relative h-full w-full rounded-full overflow-hidden bg-[#B5E4E4] ${!preview ? 'flex items-center justify-center' : ''}`}
        >
          {preview ? (
            <Image
              src={preview || '/placeholder.svg'}
              alt="Preview"
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-600">+</span>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => document.getElementById('photo-upload')?.click()}
      >
        Cargar foto
        <Upload className="h-4 w-4" />
      </Button>
      <input
        type="file"
        id="photo-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
