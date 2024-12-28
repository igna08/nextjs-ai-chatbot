import { openai } from '@ai-sdk/openai';
import { Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware } from 'ai';

import { customMiddleware } from './custom-middleware';

export const customModel  = (apiIdentifier: string) => {
  return LanguageModelV1Middleware({
    model: openai(apiIdentifier),
    middleware: customMiddleware ,
  });
};
