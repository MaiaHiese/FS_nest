import { Controller, Get } from '@nestjs/common';
import { AppService, iTrack } from './app.service';

/* Acá tengo el método solo de lectura del método appService */

@Controller() // Trabaja sobre la ruta base
export class AppController {
  constructor(private readonly appService: AppService) {} // instancia de app service

  @Get('api') // petición, redirigida al endpoint ("api")
  getTracks(): iTrack[] { 
    return this.appService.getTracks();
  }
}
