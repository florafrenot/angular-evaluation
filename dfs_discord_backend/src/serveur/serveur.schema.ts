import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Utilisateur } from 'src/utilisateur/utilisateur.schema';

export type ServeurDocument = Serveur & Document;

@Schema()
export class Serveur {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nom: string;

  @Prop({ maxlength: 100 })
  description: string;

  @Prop()
  urlLogo: string;

  @Prop()
  public: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Utilisateur'})
  proprietaire: Utilisateur
}

export const ServeurSchema = SchemaFactory.createForClass(Serveur);
