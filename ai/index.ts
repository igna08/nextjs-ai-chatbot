import { openai } from '@ai-sdk/openai';
import { Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware } from 'ai';

import { yourGuardrailMiddleware } from './custom-middleware';

export const yourGuardrailMiddleware = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: yourGuardrailMiddleware,
  });
};
