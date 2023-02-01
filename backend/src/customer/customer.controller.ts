import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCustomerDto, EditCustomerDto } from './dto';
import { CustomerService } from './customer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Get()
  getAll() {
    return this.customerService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customerService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: EditCustomerDto) {
    return this.customerService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.customerService.deleteById(id);
  }
}
