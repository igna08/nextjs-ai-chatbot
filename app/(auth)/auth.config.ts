import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // Los proveedores se configuran en un entorno compatible con Node.js
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');

      // Redirigir usuarios autenticados que intentan acceder a login o registro
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl));
      }

      // Permitir acceso a las páginas de login y registro sin autenticación
      if (isOnLogin || isOnRegister) {
        return true;
      }

      // Requerir autenticación para otras rutas
      return isLoggedIn;
    },
  }, // Esto cierra correctamente el objeto "callbacks"
};