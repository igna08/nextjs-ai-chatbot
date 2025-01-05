import { openai } from '@ai-sdk/openai';
import  {  models  }  de  '@/ai/models' ;

export const customModel = (apiIdentifier: string) => {
  return {
    model: openai( modelo.apiIdentifier ),
  };
};
