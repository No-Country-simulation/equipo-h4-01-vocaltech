import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18n/config/i18nConfig';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// solo aplica este middleware a archivos en el directorio de la aplicación
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};

