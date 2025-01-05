import { openai } from '@ai-sdk/openai';
import { models } from '@/ai/models';

export const customModel = (apiIdentifier: string) => {
  return {
    model: openai(apiIdentifier), // Corrected line
  };
};
