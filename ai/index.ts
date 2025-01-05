import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const customModel = (apiIdentifier: string) => {
  model: openai('gpt-4-turbo'),
});

for await (const textPart of textStream) {
  console.log(textPart);
}
