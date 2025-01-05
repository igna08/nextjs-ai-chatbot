
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const customModel = (apiIdentifier: string) => {
  const { messages } = await req.json();

  const result = streamText({
    model: openai(apiIdentifier),
    messages,
  });

  return result.toDataStreamResponse();
}
