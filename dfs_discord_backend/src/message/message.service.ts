import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from 'src/utilisateur/utilisateur.schema';
import { Salon, SalonDocument } from 'src/salon/salon.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Utilisateur.name) private utilisateurModel: Model<UtilisateurDocument>,
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,

  ) {}

  async createMessageInSalon(createMessageDto: any, salonId: string): Promise<Message> {
    createMessageDto.salonId = salonId;
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  // pour récupérer les messages d'un salon
  async findAllFromSalon(id: string): Promise<Message[]> {
    return this.messageModel.find({ salonId: id });
  }

}
