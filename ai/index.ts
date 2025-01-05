import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const customModel = (apiIdentifier: string) => {
  return generateText({
    model: openai(apiIdentifier),
  });
};
