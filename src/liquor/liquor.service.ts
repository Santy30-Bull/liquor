import { Injectable } from '@nestjs/common';
import { CreateLiquorDto } from './dto/create-liquor.dto';
import { UpdateLiquorDto } from './dto/update-liquor.dto';

@Injectable()
export class LiquorService {
  create(createLiquorDto: CreateLiquorDto) {
    return 'This action adds a new liquor';
  }

  findAll() {
    return `This action returns all liquor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} liquor`;
  }

  update(id: number, updateLiquorDto: UpdateLiquorDto) {
    return `This action updates a #${id} liquor`;
  }

  remove(id: number) {
    return `This action removes a #${id} liquor`;
  }
}
