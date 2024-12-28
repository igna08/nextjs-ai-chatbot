import { openai } from '@ai-sdk/openai';
import { Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware } from 'ai';

import { customMiddleware } from './custom-middleware';

export const yourGuardrailMiddleware = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: yourGuardrailMiddleware,
  });
};
