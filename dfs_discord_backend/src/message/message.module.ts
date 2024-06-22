import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import {
  Utilisateur,
  UtilisateurSchema,
} from 'src/utilisateur/utilisateur.schema';
import { Salon, SalonSchema } from 'src/salon/salon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Salon.name, schema: SalonSchema },
      { name: Utilisateur.name, schema: UtilisateurSchema },
      { name: Message.name, schema: MessageSchema },

    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
