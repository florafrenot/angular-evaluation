import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SalonDocument = Salon & Document;

@Schema()
export class Salon {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nom: string;

  @Prop({ maxlength: 150 })
  description: string;

  @Prop()
  urlImage: string;

  @Prop({ type: Types.ObjectId, ref: 'Serveur', required: true })
  serveurId: Types.ObjectId;

}

export const SalonSchema = SchemaFactory.createForClass(Salon);
