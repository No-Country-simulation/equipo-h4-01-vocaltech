'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { useAvatarSrc, useInitialsName, useUserName } from '@/hooks';

export const UserMenu = () => {
  const userName = useUserName();
  return (
    <div className="ml-auto flex items-center gap-4">
      <span className="text-sm font-medium">{userName}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={useAvatarSrc()} alt="Profile" />
              <AvatarFallback>{useInitialsName(userName)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configuración</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
