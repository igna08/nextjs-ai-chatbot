import  {  openai  }  from  '@ai-sdk/openai' ;
import  {  experimental_wrapLanguageModel  como  wrapLanguageModel  }  from  'ai' ;

import  {  customMiddleware  }  from  './custom-middleware' ;

export  const  customModel  =  ( apiIdentifier : string )  =>  {
  return  wrapLanguageModel ( {
    modelo : openai ( apiIdentifier ) ,
    middleware : middleware personalizado ,
  } ) ;
} ;
