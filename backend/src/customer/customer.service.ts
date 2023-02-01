import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto, EditCustomerDto } from './dto';
import { CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('customer') private customerModel: Model<CustomerDocument>,
  ) {}
  getAll() {
    return this.customerModel.find().exec();
  }

  getById(id: string) {
    return this.customerModel.findById(id);
  }

  create(dto: CreateCustomerDto) {
    return this.customerModel.create(dto);
  }

  async update(id: string, dto: EditCustomerDto) {
    const doc = await this.customerModel.findByIdAndUpdate(
      { _id: id },
      { ...dto },
      { new: true },
    );
    return doc;
  }

  async deleteById(id: string) {
    await this.customerModel.findByIdAndDelete({ _id: id });
    return;
  }
}
