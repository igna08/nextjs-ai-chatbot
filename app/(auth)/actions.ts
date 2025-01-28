'use server';

import { z } from 'zod';

import { createUser, getUser } from '@/db/queries';

import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    // Validar los datos del formulario
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Intentar iniciar sesión
    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false, // Desactiva la redirección automática
    });

    // Verificar si el inicio de sesión fue exitoso
    if (result?.error) {
      console.error('Error during sign-in:', result.error);
      return { status: 'failed' };
    }

    // Redirigir manualmente después de un inicio de sesión exitoso
    if (result?.url) {
      // Redirige a la URL de callback o a la página principal
      window.location.href = result.url; // O usa tu framework de routing
    }

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    console.error('Unexpected error during login:', error);
    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    // Validar los datos del formulario
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Verificar si el usuario ya existe
    const [user] = await getUser(validatedData.email);
    if (user) {
      return { status: 'user_exists' };
    }

    // Crear el nuevo usuario
    await createUser(validatedData.email, validatedData.password);

    // Iniciar sesión automáticamente después del registro
    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false, // Desactiva la redirección automática
    });

    // Verificar si el inicio de sesión fue exitoso
    if (result?.error) {
      console.error('Error during sign-in after registration:', result.error);
      return { status: 'failed' };
    }

    // Redirigir manualmente después de un inicio de sesión exitoso
    if (result?.url) {
      // Redirige a la URL de callback o a la página principal
      window.location.href = result.url; // O usa tu framework de routing
    }

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    console.error('Unexpected error during registration:', error);
    return { status: 'failed' };
  }
};
