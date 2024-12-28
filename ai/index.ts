importar  {  openai  }  desde  '@ai-sdk/openai' ;
importar  {  experimental_wrapLanguageModel  como  wrapLanguageModel  }  de  'ai' ;

importar  {  customMiddleware  }  desde  './custom-middleware' ;

exportar  const  customModel  =  ( apiIdentifier : string )  =>  {
  devolver  wrapLanguageModel ( {
    modelo : openai ( apiIdentifier ) ,
    middleware : middleware personalizado ,
  } ) ;
} ;
