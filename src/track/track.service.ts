import { Injectable } from '@nestjs/common';
import { Track } from './track.interface';

const BASE_URL = 'http://localhost:3030/tracks/';

@Injectable()

export class TrackService {
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
      const id = tracks[tracks.length-1].id + 1;
      return id;
    }

      async getTrackById(id: number): Promise<Track> {
        const res = await fetch (BASE_URL + id);
        const parsed = await res.json();
        return parsed;
        }
      
    async getTracks(): Promise <Track[]> {
    const res = await fetch(BASE_URL)
    const parsed = await res.json();
    return parsed;
      }
}

