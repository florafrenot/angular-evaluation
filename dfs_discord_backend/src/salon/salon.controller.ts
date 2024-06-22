import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { SalonService } from './salon.service';
import { Salon } from './salon.schema';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  //je récupère tous les salons d'un serveur spécifique
  @Get('serveur/:serveurId')
  // @UseGuards(AuthGuard)
  findAll(@Request() requete, @Param("serveurId") id: string) {

    return this.salonService.findAllFromServer(id);
  }

  // Pour ajouter un salon
  @Post(':serveurId/creer')
  @UseGuards(AuthGuard)
  async createSalonInServeur(
    @Body() createSalonDto: any,
    @Param('serveurId') serveurId: string,
  ): Promise<Salon> {
    return this.salonService.createSalonInServeur(createSalonDto, serveurId);
  }

}
