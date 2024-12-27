import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const { text }  = (apiIdentifier: string) => {
  return {
    model: openai(apiIdentifier),
  };
};
