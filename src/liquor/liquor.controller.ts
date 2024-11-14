/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LiquorService } from './liquor.service';
import { CreateLiquorDto } from './dto/create-liquor.dto';
import { UpdateLiquorDto } from './dto/update-liquor.dto';

@Controller()
export class LiquorController {
  constructor(private readonly liquorService: LiquorService) {}

  @MessagePattern({ cmd: 'create_liquor' })
  async create(@Payload() createLiquorDto: CreateLiquorDto) {
    return this.liquorService.create(createLiquorDto);
  }

  @MessagePattern({ cmd: 'find_one_liquor' })
  async findOne(@Payload() payload: { id: string }) {
    return this.liquorService.findOne(+payload.id);
  }

  @MessagePattern({ cmd: 'find_all_liquors' })
  async findAll() {
    return this.liquorService.findAll();
  }

  @MessagePattern({ cmd: 'update_liquor' })
  async update(@Payload() payload: { id: string; data: UpdateLiquorDto }) {
    return this.liquorService.update(+payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_liquor' })
  async remove(@Payload() payload: { id: string }) {
    return this.liquorService.remove(+payload.id);
  }
}
