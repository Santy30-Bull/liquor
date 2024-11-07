/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LiquorService } from './liquor.service';
import { CreateLiquorDto } from './dto/create-liquor.dto';
import { UpdateLiquorDto } from './dto/update-liquor.dto';

@Controller('liquors')
export class LiquorController {
  constructor(private readonly liquorService: LiquorService) {}

  @Post()
  create(@Body() createLiquorDto: CreateLiquorDto) {
    return this.liquorService.create(createLiquorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.liquorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLiquorDto: UpdateLiquorDto) {
    return this.liquorService.update(id, updateLiquorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.liquorService.remove(id);
  }
}
