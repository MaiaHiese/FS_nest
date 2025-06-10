/* app service maneja LA LÓGICA de mi app*/

import { Injectable } from '@nestjs/common';

/*Creamos una interfaz denominada iTrack para que cuando creemos
los objetos (canciones) respeten esa estructura */ 

export interface iTrack {
  id: number,
  title: string,
  duration: number,
  artist: string
}
/* Provisoriamente lo hacemos acá, obvio esta info que acá la 
gaurdamos en la memoria, en realidad va en una base de datos. 
Ahora bien, esta lógica quien la ejecuta? el controlador*/ 
export const tracks: iTrack[] = [
{
  id: 1,
  title: "cancion 1",
  duration: 120,
  artist: "interprete 1"
}, 
{
  id: 2,
  title: "cancion 2",
  duration: 130,
  artist: "interprete 2"
}, 
{
  id: 3,
  title: "cancion 3",
  duration: 220,
  artist: "interprete 3"
},
]

/* Este médoto es el que me va a retornar lo que tengo
guardado en mi variable (en este caso, la lista de canciones). 
Pero para que yo pueda visualizar esto tengo que tener un método que 
me haga esa petición (que la tengo en el controlador)  */
@Injectable()
export class AppService {
  getTracks(): iTrack [] {
    return tracks
  }
}
