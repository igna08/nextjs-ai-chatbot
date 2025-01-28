import type { NextAuthConfig } from 'next-auth';
import { NextRequest } from 'next/server';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login', // Página de inicio de sesión
    newUser: '/', // Página de nuevo usuario
  },
  providers: [
    // Aquí configuramos los proveedores de autenticación
    // Ejemplo: Credentials, Google, etc.
  ],
  callbacks: {
    async authorized({
      auth,
      request,
    }: {
      auth: { user?: { id: string; email: string } } | null; // Tipado para auth
      request: NextRequest; // Tipado para request
    }) {
      const isLoggedIn = !!auth?.user; // Verifica si el usuario está autenticado
      const isOnLogin = request.nextUrl.pathname.startsWith('/login'); // Verifica si está en la página de login
      const isOnRegister = request.nextUrl.pathname.startsWith('/register'); // Verifica si está en la página de registro

      // Redirigir usuarios autenticados que intentan acceder a login o registro
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      // Permitir acceso a las páginas de login y registro sin autenticación
      if (isOnLogin || isOnRegister) {
        return true;
      }

      // Requerir autenticación para otras rutas
      return isLoggedIn;
    },
  },
};