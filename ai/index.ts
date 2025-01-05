import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { models, DEFAULT_MODEL_NAME } from './models'; // Ajusta el path si es necesario

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Obtén el modelo predeterminado
  const defaultModel = models.find((model) => model.id === DEFAULT_MODEL_NAME);

  if (!defaultModel) {
    throw new Error(`Modelo predeterminado no encontrado: ${DEFAULT_MODEL_NAME}`);
  }

  try {
    // Maneja la promesa devuelta por streamText
    const result = await streamText({
      model: openai(defaultModel.apiIdentifier),
      messages,
    });

    // Devuelve el resultado procesado
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error procesando la solicitud:', error);
    return new Response('Error procesando la solicitud', { status: 500 });
  }
}
