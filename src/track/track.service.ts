import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './track.interface';
import { parse } from 'path';

const BASE_URL = 'http://localhost:3030/tracks/';

@Injectable()

export class TrackService {

  async updateTrackById(id: number, body: Track): Promise <Track | undefined> {
    const isTrack: Track | undefined = await this.getTrackById(id);

    if (!isTrack || !Object.keys(isTrack).length) {
      console.warn(`Track con id ${id} no encontrado`);
      return;
    }

    const updateTrack = { ...body, id};
    console.log('Pista actualizada', updateTrack.title);

    const res = await fetch (BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateTrack)
    });
    // const parsed = await res.json();
    // return parsed; estas dos líneas, al agregar el httpcodes y no mostrar
    // no necesitamos, era para validación interna nuestra

    if(!res.ok) {
      console.log('El track no se pudo actualizar')
      return;
    }
  }

  async deleteTrackById (id:number): Promise<Track> {
    const res = await fetch (BASE_URL + id, {
      method: 'DELETE',      
    })
    const parsed = res.json();
    return parsed;
  }

    async createTrack(track: Track): Promise <Track> {
      const idn = await this.setId();
      //const newTrack = (id,...track);

      const newTrack:Track = {
        id: idn,
        title: track.title,
        duration: track.duration,
        artist: track.artist
      };

      const res = await fetch (BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newTrack),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsed = await res.json();
      return parsed;
    }

    private async setId(): Promise<number> { //este método solo lo va a usar el creatTrack, por eso lo hacemos privado
      const tracks = await this.getTracks();
      const lastTrack = tracks[tracks.length - 1];
      const lastId = Number(lastTrack.id); // aseguramos que sea número
      const newId = lastId + 1;
      return newId;
    }

    /*Así tenía el getTrackById antes de aplicar los filtros de excepción 
      async getTrackById(id: number): Promise <Track | undefined> {
        const res = await fetch (BASE_URL + id);
        console.log("Estado: " + res.status)

        if (!res.ok){
          return undefined
        }

        try {
          return await res.json();
          } catch (err) {
            console.log(err)
            return undefined;
          }
        }
      
    async getTracks(): Promise <Track[]> {
    const res = await fetch(BASE_URL)
    const parsed = await res.json();
    return parsed;
      }
    */

    async getTrackById(id: number): Promise <Track | undefined> {
        const res = await fetch (BASE_URL + id);
        
        try {
          const parsed = await res.json();
          if (Object.keys(parsed).length) return parsed;
          
          } catch (err) {
            console.log(err)
            throw new NotFoundException('No se encontró el id')
         }
        }
      
    async getTracks(): Promise <Track[]> {
    const res = await fetch(BASE_URL)
    const parsed = await res.json();
    return parsed;
      }

}

