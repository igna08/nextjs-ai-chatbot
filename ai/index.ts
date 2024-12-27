import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { NextRequest } from 'next/server'; // Asegúrate de importar el tipo correcto

export const customMiddleware = {
  async fetch(req: NextRequest) { // Especifica el tipo de req
    const response = await fetch(req); // Llama al modelo AI
    const data = await response.json(); // Obtiene la respuesta sin modificarla
    return new Response(JSON.stringify(data), { status: response.status }); // Devuelve la respuesta original
  }
};

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
};
