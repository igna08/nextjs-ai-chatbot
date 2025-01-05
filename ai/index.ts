import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { models, DEFAULT_MODEL_NAME } from './models'; // Ajusta el path si es necesario



exportar  const  customModel  =  ( apiIdentifier : string )  =>  {
  devolver  customModel ( {
    modelo : openai ( apiIdentifier ) ,
  } ) ;
} ;
