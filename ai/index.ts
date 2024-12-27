import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export const customMiddleware = {
  async fetch(req: NextRequest): Promise<NextResponse> {
    const response = await fetch(req); // Llama al modelo AI
    const data = await response.json(); // Obtiene la respuesta sin modificarla
    return NextResponse.json(data); // Devuelve la respuesta original
  }
};

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware as unknown as Experimental_LanguageModelV1Middleware, // Asegúrate de que coincida con el tipo esperado
  });
};
