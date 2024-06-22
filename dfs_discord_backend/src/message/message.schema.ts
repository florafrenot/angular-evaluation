import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  contenu: string;

  @Prop({ type: Types.ObjectId, ref: 'Salon', required: true })
  salonId: Types.ObjectId;


  @Prop({ type: Types.ObjectId, ref: 'Utilisateur', required: true })
  utilisateurId: Types.ObjectId;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
