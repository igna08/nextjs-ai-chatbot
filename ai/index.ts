import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { models, DEFAULT_MODEL_NAME } from './models'; // Ajusta el path si es necesario

(async () => {
  // Obtén el modelo predeterminado
  const defaultModel = models.find((model) => model.id === DEFAULT_MODEL_NAME);

  if (!defaultModel) {
    console.error(`Modelo predeterminado no encontrado: ${DEFAULT_MODEL_NAME}`);
    return;
  }

  try {
    // Inicia el flujo de texto
    const { textStream } = streamText({
      model: openai(defaultModel.apiIdentifier),
    });

    // Procesa cada parte
