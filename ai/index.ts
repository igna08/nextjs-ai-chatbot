import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

// Configuración del modelo personalizado
export const customModel = (apiIdentifier: string) => {
  // Envuelve el modelo OpenAI con middleware personalizable
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: async (input, next) => {
      // Llama a la siguiente función sin modificar la respuesta
      const response = await next(input);
      
      // Retorna la respuesta tal cual, sin modificaciones
      return response;
    }
  });
};
