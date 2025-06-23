/* Este archivo y el de service lo creamos mediante CLI (consola) 
con los comandos:
nest generate controller track
nest generate service track
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';
/*import { iTrack } from 'src/app.service';*/

@Controller('track') // antes lo tenia en el segundo get
export class TrackController {
    constructor(private readonly  trackService: TrackService) {}

    @Get()
    getTracks(): Promise<Track[]> {
        return this.trackService.getTracks();
    }
    @Get(':id')
    getTrackById(@Param('id') id: number): Promise<Track> {
        return this.trackService.getTrackById(id);
    }

/* para usar postman, tenemos que indicarle al controlador
    que se comunique con el service y le indique dónde postear y etc. */

    @Post()
    createTrack(@Body() body: Track): Promise<Track> {
    return this.trackService.createTrack(body); //el metodo createTrack no existe en el service, tenemos que crearlo 
    }

    @Delete(':id')
    deleteTrackId(@Param('id') id: number): Promise <Track> {
        return this.trackService.deleteTrackById(id);
    }

    @Put(':id')
    updateTrackById(@Param('id') id: number, @Body() body): Promise <Track | undefined> {
        return this.trackService.updateTrackById(id, body)
    }
}
