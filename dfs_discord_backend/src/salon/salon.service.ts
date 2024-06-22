import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './salon.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from 'src/utilisateur/utilisateur.schema';
import { Server } from 'http';
import { ServeurDocument } from 'src/serveur/serveur.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
    @InjectModel(Utilisateur.name) private utilisateurModel: Model<UtilisateurDocument>,
    @InjectModel(Server.name) private serveurModel: Model<ServeurDocument>,

  ) {}

  async create(createSalonDto: any): Promise<Salon> {
    const createdSalon = new this.salonModel(createSalonDto);
    return createdSalon.save();
  }

  async findAllPublic(): Promise<Salon[]> {
    return this.salonModel.find();
  }

  async findAllByServer(serveurId: string): Promise<Salon[]> {
    const salons = await this.salonModel.find({ serveurId }).exec();
    return salons;
  }

  async findAllFromServer(serverId: string): Promise<Salon[]> {
    return this.salonModel.find({ serveurId: serverId });
  }

  async createSalonInServeur(createSalonDto: any, serveurId: string): Promise<Salon> {
    createSalonDto.serveurId = serveurId;
    const createdSalon = new this.salonModel(createSalonDto);
    return createdSalon.save();
  }


  // async findAllByServer(serveurId: string): Promise<Salon[]> {
  //   return this.salonModel.find({ serveurId }).exec();
  // }
}
