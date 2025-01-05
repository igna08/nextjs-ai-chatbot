import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const { textStream } = streamText({
  model: openai('gpt-4-turbo'),
});

for await (const textPart of textStream) {
  console.log(textPart);
}
