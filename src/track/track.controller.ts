/* Este archivo y el de service lo creamos mediante CLI (consola) 
con los comandos:
nest generate controller track
nest generate service track
*/

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';
import { TrackDto } from './track.dto';
/*import { iTrack } from 'src/app.service';*/

@Controller('track') // antes lo tenia en el segundo get
export class TrackController {
    constructor(private readonly  trackService: TrackService) {}

    @Get()
    getTracks(): Promise<Track[]> {
        return this.trackService.getTracks();
    }
    
    /* primero lo teníamos así: 
    @Get(':id')
    getTrackById(@Param('id') id: number): Promise <Track | undefined> {
        return this.trackService.getTrackById(id);
    }*/
   
    /* 2) Antes de aprender a usar los filtros de excepción, teníamos la lógica acá:
    @Get(':id')
    async getTrackById(@Res() response,  @Param('id') id: number): Promise<Track> {
    const responseFormService = await this.trackService.getTrackById(id);

    if (responseFormService && Object.keys(responseFormService).length) {
      return response.status(HttpStatus.OK).json(responseFormService);
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({error: 'No se encontró el recurso en la BD'})
    }*/

    @Get(':id')
    getTrackById(@Param('id', ParseIntPipe) id: number): Promise <Track | undefined> {
    return this.trackService.getTrackById(id);
  }

/* para usar postman, tenemos que indicarle al controlador
    que se comunique con el service y le indique dónde postear y etc. */

    /* método post antes de hacer DTO  

    @Post()
    createTrack(@Body() body: Track): Promise <Track> {
    return this.trackService.createTrack(body); //el metodo createTrack no existe en el service, tenemos que crearlo 
    }
    */

    /* */ 
    @Post()
    createTrack(@Body() trackDto: TrackDto): Promise<any> {
    return this.trackService.createTrack(trackDto); // lo tengo que agregar al service en el metodo create track
    }
    
    @Delete(':id')
    deleteTrackId(@Param('id') id: number): Promise <Track> {
        return this.trackService.deleteTrackById(id);
    }

    @Put(':id')
    @HttpCode(204)
    updateTrackById(@Param('id') id: number, @Body() body): Promise <Track | undefined> {
        return this.trackService.updateTrackById(id, body)
    }
}
