import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phonenumber: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  cpf: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
