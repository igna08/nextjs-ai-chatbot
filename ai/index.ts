import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { models, DEFAULT_MODEL_NAME } from './models'; // Importa los modelos y el modelo predeterminado

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Obtén el modelo predeterminado o ajusta según sea necesario
  const defaultModel = models.find((model) => model.id === DEFAULT_MODEL_NAME);

  if (!defaultModel) {
    throw new Error(`Modelo predeterminado no encontrado: ${DEFAULT_MODEL_NAME}`);
  }

  const result = streamText({
    model: openai(defaultModel.apiIdentifier), // Usa el apiIdentifier del modelo predeterminado
    messages,
  });

  return result.toDataStreamResponse();
}
