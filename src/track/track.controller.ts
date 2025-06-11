/* Este archivo y el de service lo creamos mediante CLI (consola) 
con los comandos: 
nest generate controller track
nest generate service track
*/

import { Controller } from '@nestjs/common';

@Controller('track')
export class TrackController {}
