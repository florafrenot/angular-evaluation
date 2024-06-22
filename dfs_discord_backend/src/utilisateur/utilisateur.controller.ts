import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth.guard';

@Controller()
export class UtilisateurController {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
  ) {}

  // @Get('/utilisateur')
  // @UseGuards(AuthGuard)
  // async getUtilisateur(@Request() req) {
  //   const email = req.user.sub;
  //   const utilisateur = await this.utilisateurService.getByEmail(email);
  //   return utilisateur;
  // }

  @Get('/utilisateur')
  @UseGuards(AuthGuard)
  async getProfilUtilisateur(@Request() req) {
    const email = req.user.sub; 
    const utilisateur = await this.utilisateurService.getByEmail(email);
    return { _id: utilisateur._id, email: utilisateur.email};
  }

  

  @Post('inscription')
  async inscription(@Body() createUtilisateurDto: any) {
    //TODO : vérifier les donnée (regles mot de passe, email unique ...)

    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Post('login')
  async create(@Body() utilisateurDto: any) {
    const utilisateur =
      await this.utilisateurService.getByEmailAndClearPassword(
        utilisateurDto.email,
        utilisateurDto.password,
      );

    const payload = {
      sub: utilisateur.email,
    };

    return await this.jwtService.signAsync(payload);
  }

  @Post('rejoindre-serveur')
  @UseGuards(AuthGuard)
  async rejoindreServeur(
    @Body() serveurArejoindreDto: any,
    @Request() requete,
  ) {
    const email = requete.user.sub;

    return this.utilisateurService.rejoindreServeur(
      email,
      serveurArejoindreDto._id,
    );
  }

  // récupérer les utilisateurs d'un serveur
  @Get('serveur/:serveurId/utilisateurs')
  @UseGuards(AuthGuard)
  async getUtilisateursByServeurId(@Param('serveurId') serveurId: number) {
    return this.utilisateurService.findAllByServeurId(serveurId);
  }

  //je bloque un utilisateur
  // @Post(':serveurId/bloquer/:utilisateurId')
  // @UseGuards(AuthGuard)
  // async bloquerUtilisateur(
  //   @Param('serveurId') serveurId: string,
  //   @Param('utilisateurId') utilisateurId: string, // user à bloquer
  //   @Request() req,
  // ) {
  //   const email = req.user.sub;

  //    try {
  //      await this.utilisateurService.bloquerUtilisateur(email, serveurId, utilisateurId);
  //      return { message: 'Utilisateur bloqué avec succès dans le serveur' };
  //    } catch (error) {
  //      return { message: `Erreur lors du blocage de l'utilisateur : ${error.message}` };
  //   }
  // }

  // @Get()
  // @UseGuards(AuthGuard)
  // async getCurrentUser(@Request() req) {
  //   const email = req.user.sub;
  //   const utilisateur = await this.utilisateurService.getByEmail(email);
  //   return utilisateur;
  // }


  // @Get()
  // findAll() {
  //   return this.utilisateurService.findAll();
  // }

  // @Get()
  // @UseGuards(AuthGuard)
  // getUtilisateur(@Request() req) {
  //   return req.user; 
  // }

}
