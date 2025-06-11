/* Este archivo y el de service lo creamos mediante CLI (consola) 
con los comandos: 
nest generate controller track
nest generate service track
*/

import { Controller, Get } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';
/*import { iTrack } from 'src/app.service';*/ 

@Controller('track')
export class TrackController {
    constructor(private readonly  trackService: TrackService) {}

    @Get()
    getTracks(): Promise<Track[]> {
        return this.trackService.getTracks();
    }
}
